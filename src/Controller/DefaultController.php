<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

class DefaultController extends AbstractController
{
    /**
     * @Route("/default", name="default")
     */
    public function index(Request $request)
    {
        $lang = $request->query->get('lang'); // get from url

        if (!$lang) { // or from browser settings
            $lang = substr($request->headers->get('Accept-Language'), 0, 2);
        }

        $lang = in_array($lang, ['en', 'pl']) ? $lang : 'en'; // if out of pl/en then get en

        return $this->render('default/index.html.twig', [
            'lang' => $lang
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
