<?php

namespace App\Controller;

use App\Entity\BasePrice;
use App\Entity\UserContact;
use function GuzzleHttp\Psr7\str;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

class DefaultController extends AbstractController
{
    /**
     * @param Request $request
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    private function logVisit(Request $request) {
        $client = new \GuzzleHttp\Client();
        $data = [
//            "req" => $request,
            "url" => $request->getScheme() . '://' . $request->getHttpHost() . $request->getRequestUri(),
            "ip" => $request->getClientIp(),
            "userAgent" => $request->headers->get('user-agent'),
            "productId" => 1
        ];

        $res = $client->request('POST', getenv('PRECISE_SALE_URL').'/visit', [
            'json' => $data,
            'headers' => [
                'Authorization' => 'Bearer '.getenv('PRECISE_SALE_API_KEY')
            ]
        ]);

//        dump($res);
//        dump((string) $res->getBody());

        $id = json_decode((string) $res->getBody())->_id;

//        dump($id);
//        die;
        return $id;
    }

    /**
     * @param Request $request
     * @param int $qty
     * @param float $basePrice
     * @throws \GuzzleHttp\Exception\GuzzleException
     * @throws \Exception
     * @return int $id
     */
    private function logBought(Request $request, int $qty, float $basePrice) {
        $id = random_int(1, 1e10);
        $client = new \GuzzleHttp\Client();
        $visitId = $request->query->get('visitId');

        $data = [
            "id" => $id,
            "grand_total" => $qty*$basePrice,
            "products" => [[
                "id" =>  1,
                "price" => $basePrice,
                "quantity" => $qty
            ]],
            "visitId" => $visitId
        ];

        $client->request('PUT', getenv('PRECISE_SALE_URL').'/order/'.$id, [
            'json' => $data,
            'headers' => [
                'Authorization' => 'Bearer '.getenv('PRECISE_SALE_API_KEY')
            ]
        ]);

        return $id;
    }

    /**
     * @throws \GuzzleHttp\Exception\GuzzleException
     * @throws \Exception
     */
    private function logReprice() {
        $client = new \GuzzleHttp\Client();

        $res = $client->request('GET', getenv('PRECISE_SALE_URL').'/product?to_reprice=true', [
            'headers' => [
                'Authorization' => 'Bearer '.getenv('PRECISE_SALE_API_KEY'),
                'Content-Type' => 'application/json'
            ]
        ]);

        foreach (json_decode((string) $res->getBody()) as $proposed) {
            /**
             * @var BasePrice
             */
            $product = $this->getDoctrine()->getManager()->getRepository(BasePrice::class)->findOneBy([]);
//            dump($proposed);
            $product->setValue($proposed->proposed_price);
//            dump($product);
            $this->getDoctrine()->getManager()->persist($product);

            $id = 1;

            $data = [
                "id" => $id,
                "price" => $proposed->proposed_price
            ];

            $res = $client->request('PUT', getenv('PRECISE_SALE_URL').'/product/1', [
                'json' => $data,
                'headers' => [
                    'Authorization' => 'Bearer '.getenv('PRECISE_SALE_API_KEY'),
//                'Content-Type' => 'application/json'
                ]
            ]);

            break;
        }
        $this->getDoctrine()->getManager()->flush();




//        dump(json_decode((string) $res->getBody()));
//        die;
    }

    /**
     * @param int $id
     * @param Request $request
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function logConfirm(int $id, Request $request) {

        $email = $request->query->get('email');
        $visitId = $request->query->get('visitId');
        $client = new \GuzzleHttp\Client();


        $user = new UserContact();
        $user->setEmail($email);
        $user->setPhone("");
        $user->setVisitId($visitId);
        $user->setDate(new \DateTime());
        $this->getDoctrine()->getManager()->persist($user);
        $this->getDoctrine()->getManager()->flush();

        $res = $client->request('GET', getenv('PRECISE_SALE_URL').'/order/'.$id, [
            'headers' => [
                'Authorization' => 'Bearer '.getenv('PRECISE_SALE_API_KEY'),
                'Content-Type' => 'application/json'
            ]
        ]);

        $order = json_decode((string) $res->getBody());

        $qty = $order->products[0]->quantity;
        $basePrice = $order->products[0]->price;

//        dump($qty, $basePrice);
//        die;

        $data = [
            "id" => $id,
            "grand_total" => $qty*$basePrice,
            "products" => [[
                "id" =>  1,
                "price" => $basePrice,
                "quantity" => $qty
            ]],
            "email" => $email,
            "visitId" => $visitId
        ];

        $res = $client->request('PUT', getenv('PRECISE_SALE_URL').'/order/'.$id, [
            'json' => $data,
            'headers' => [
                'Authorization' => 'Bearer '.getenv('PRECISE_SALE_API_KEY')
            ]
        ]);

//        dump($res);
//        dump((string) $res->getBody());
//        die;
    }

    /**
     * @Route("/", name="default")
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function index(Request $request)
    {
        $lang = $request->query->get('lang'); // get from url

        if (!$lang) { // or from browser settings
            $lang = substr($request->headers->get('Accept-Language'), 0, 2);
        }

        $lang = in_array($lang, ['en', 'pl']) ? $lang : 'en'; // if out of pl/en then get en

        $visitId = $this->logVisit($request);

        return $this->render('default/index.html.twig', [
            'lang' => $lang,
            'basePrice' => $this->getDoctrine()->getManager()->getRepository(BasePrice::class)->findOneBy([])->getValue(),
            'visitId' => $visitId
        ]);
    }

    /**
     * @Route("/send_email", name="send_email")
     * @Method({"POST"})
     */
    public function sendEmail(Request $request, \Swift_Mailer $mailer)
    {

        $data = [];
        $content = $request->getContent();
        if (!empty($content)) {
            $data = json_decode($content, true); // 2nd param to get as array
        }

        if (   !isset($data['email'])
            || !$data['email']
            || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)
            || !isset($data['message'])
            || !$data['message']
        ) {
            return new JsonResponse(['status' => 'Invalid data'], 400);
        } else {

            $message = (new \Swift_Message('Message from autodating.pl'))
                ->setFrom('send@example.com')
                ->setTo(getenv('APP_ENV') === 'dev' ? 'gustaw.daniel@gmail.com' : 'gustaw.daniel@gmail.com')
                ->setBody(
                    $this->renderView(
                        'emails/message.html.twig',
                        $data
                    ),
                    'text/html'
                );

            $mailer->send($message);

            $message = (new \Swift_Message($data['lang'] === 'en' ? 'Your message was send to autodating.pl' : 'Twoja wiadomość została wysłana do serwisu autodating.pl'))
                ->setFrom('office@autodating.pl')
                ->setTo(getenv('APP_ENV') === 'dev' ? 'gustaw.daniel@gmail.com' : $data['email'])
                ->setBody(
                    $this->renderView(
                        'emails/confirm.'.$data['lang'].'.html.twig',
                        $data
                    ),
                    'text/html'
                );

            $mailer->send($message);

            return new JsonResponse($data);
        }
    }

    /**
     * @param int $qty - number of units of product 1, 3, 7
     * @param float $basePrice - number of units of product 5, 15, 45
     * @param Request $request - request
     * @return JsonResponse
     * @throws \GuzzleHttp\Exception\GuzzleException
     * @Route("/buy/{qty}/{basePrice}", name="buy")
     */
    public function buy(Request $request, int $qty, float $basePrice) {

        $id = $this->logBought($request, (int) $qty, $basePrice);

        return new JsonResponse(["status" => "saved", "qty" => $qty, "basePrice" => $basePrice, "id" => $id]);
    }

    /**
     * @return JsonResponse
     * @throws \GuzzleHttp\Exception\GuzzleException
     * @Route("/reprice", name="reprice")
     */
    public function reprice() {
        $this->logReprice();

        return new JsonResponse(["status" => "repriced"]);
    }

    /**
     * @param int $oderId
     * @param Request $request
     * @return JsonResponse
     * @throws \GuzzleHttp\Exception\GuzzleException
     * @Route("/confirm/{orderId}", name="confirm")
     */
    public function confirm(int $orderId, Request $request) {
        $this->logConfirm($orderId, $request);


        return new JsonResponse(["status" => "repriced"]);
    }

//    Method to subscribe commented out because of we use jquery.ajaxchimp plugin that allow to send mail directly to mailhimp without API

//    /**
//     * @Route("/subscribe", name="subscribe")
//     * @Method({"POST"})
//     */
//    public function subscribe(Request $request)
//    {
//        $data = [];
//        $content = $request->getContent();
//        if (!empty($content)) {
//            $data = json_decode($content, true); // 2nd param to get as array
//        }
//
//        if (!isset($data['email']) || !$data['email'] || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
//            return new JsonResponse(['status' => 'Invalid data'], 400);
//        } else {
//
//            $client = new \GuzzleHttp\Client();
//            $res = $client->request('POST', 'https://'.getenv('MAILCHIMP_DC').'.api.mailchimp.com/3.0/lists/'.getenv('MAILCHIMP_LIST'), [
//                'auth' => ['anystring', getenv('MAILCHIMP_KEY')],
//                'json' => ["members" => [ ["email_address" => $data['email'], "status" => "subscribed"]]]
//            ]);
//
//            $data['total_created'] = json_decode($res->getBody())->total_created;
//
//            return new JsonResponse($data);
//        }
//    }
}
