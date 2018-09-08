const PLN_USD = 3.65;
const PRICE_BASE = window.PRICE_BASE || 15; // 1,3,5

const price = (lang) => {
    let usd = [1,3,7].map(m => m*PRICE_BASE);
    if(lang === 'en') {
        return usd.map(m => (Math.round(m*100)/100).toFixed(2));
    } else { // lang === 'pl'
        return usd.map(m => (Math.round(m*PLN_USD*10)/10).toFixed(2))
    }
};

// console.log(price('en'));
// console.log(price('pl'));

// Ready translated locale messages
const messages = {
    en: {
        nav: {
            home: 'Home',
            feature: 'Feature',
            testimonials: 'Testimonials',
            pricing: 'Pricing',
            question: 'Questions',
        },
        header: {
            l1: 'Automate',
            l2: 'arranging appointments',
            l3: 'from',
            l4: 'dating sites',
            sub: 'Subscribe',
            news: 'to our newsletter for fast updates & news',
            email: 'Your Email Address...'
        },
        features: {
            header: 'Features',
            list: [
                {
                    header: 'Time Saving',
                    paragraph: 'Save your precious time to use it real meetings'
                },
                {
                    header: 'Real Meetings',
                    paragraph: 'Omit looking at avatars and have fun from live meetings'
                },
                {
                    header: 'Photos Improvements',
                    paragraph: 'Our experts will check that your photos will be perfect'
                },
                {
                    header: 'Machine Learning',
                    paragraph: 'Use artifical intellience to flirt by internet'
                }
            ]
        },
        video: {
            q1: "Problem",
            a1: "You want to spend the evening with a girl, but you do not have time to meet her",
            q2: "Solution",
            a2: "Make an appointment with her on the internet without risking time to write with her",
            q3: "How it works",
            a3: "You send photos and free dates, our experts arrange a meeting",
            q4: "I want to have it",
            a4: "Great, check our price list and choose the right package"
        },
        why: {
            header: 'Why chose us',
            first: {
                header: 'Meet real people',
                paragraph: 'You will meet with women you have not dreamed about, not giving up anything you love, without looking for them and wondering what to write'
            },
            second: {
                header: 'No waste time',
                paragraph: 'We know how to detect people who do not use dating sites for meetings, we know what to write to them so they can not wait to get to know you'
            },
            third: {
                header: 'Expert advice',
                paragraph: 'We will advise you how to prepare a bedroom, which hairstyles are fashionable, what topics for conversation are the best, how to lower your voice...'
            }
        },
        testimonials: {
            header: 'Testimonials',
            list: [
                {
                    paragraph: 'When I started using dating apps, my goal was to meet cool women, not to click pictures and sit with my nose on the phone. Thanks to auto-dating.pl, using dating services again makes sense to me.',
                    name: 'Adam',
                    age: '22'
                },
                {
                    paragraph: 'I had moderate results before using the site. It happened to arrange a meeting, but I always felt that much of the conversation did not lead to anything constructive. Now I focus only on relationships with women who want to meet with me, and live a much deeper relationship easily. I am more satisfied with my social life, because instead of writing with strangers, I can meet real friends.',
                    name: 'Albert',
                    age: '35'
                },
                {
                    paragraph: 'Since I remember, I have valued my time very much. Dating sites were supposed to help in dating interesting people, but I had the impression that people using them want to write endlessly instead of meeting and after 15 minutes to know if there is chemistry or not. The autodating.pl service does what dormant websites should allow, but it does not require losing time on inconvenient conversations.',
                    name: 'Roland',
                    age: '27'
                }
            ]
        },
        pricing: {
            header: 'Pricing',
            buy: 'Purchase',
            list: [
                {
                    name: 'Basic',
                    price: '$'+price('en')[0],
                    up: 'Up To 1,500 clicks / month',
                    photo: 'One improved photo',
                    stats: 'Access to basics statistics',
                },{
                    name: 'Standard',
                    price: '$'+price('en')[1],
                    up: 'Up To 5,000 clicks / month',
                    photo: 'Two improved photos',
                    stats: 'Stats in comparison typical results',
                    open: 'Possibility of creating your openers',
                },{
                    name: 'Advance',
                    price: '$'+price('en')[2],
                    up: 'Up To 12,000 clicks / month',
                    photo: 'Five improved photos',
                    stats: 'Detailed statistics about all clicks',
                    open: 'Private, secret, unique openers',
                    bonuses: 'Faster access to our training materials'
                },
            ]
        },
        available: {
            header: 'Focus on experiencing',
            paragraph: 'With us you will never feel the frustration associated with performing repetitive activities to arrange an appointment via the Internet. Pay attention to life, not the phone.'
        },
        faq: {
            header: 'FAQ',
            list: [
                {
                    q: 'How it works?',
                    a: 'Our cooperation requires you to give a name, a characteristic character of the style of being, to send a few photos, to specify free hours for meetings and places. Our scope is to create accounts for you on appropriate dating sites and to make conversations. Hangouts will be added to your calendar and you will receive notifications associated with them.'
                },{
                    q: 'How do you make meetings so cheap?',
                    a: 'All thanks to automation. Conversations are conducted by our expert only when exploring new dialog trees. Thanks to the incredible progress that has been made in this field, it is increasingly difficult to distinguish between writing and the machine from writing with a human, and our algorithm has to learn to effectively arrange encounters of experience gathered on all conversations of all clients.'
                },{
                    q: 'How can I influence the conversation?',
                    a: 'In the case of standard and advanced subscriptions, these are special starts. In addition to characterizing your lifestyle, you allow us to adapt the vocabulary to it. In addition, there is little point in focusing on this, because the real relationship starts only at the meeting, writing the text should be treated only as a filter, and not a tool for building relationships.'
                },{
                    q: 'Is bot spraying ethical?',
                    a: 'It all depends on what is your intention. If it is to share what is good with another person, then our platform can be treated like a car - it accelerates reaching a specific point. We believe that sharing a smile face-to-face is good, and stare at the phone does not, that\'s why we are proud that we can create and use this platform ourselves.'
                },
            ]
        },
        modal: {
            header: "Thank you for your desire to purchase!",
            paragraph1: "We have great news for you. Because our service is currently undergoing tests, you will receive the first month of using the system for free.",
            paragraph2: "Enter e-mail and confirm, we will contact you and we will determine what girls where and when we arrange.",
            confirm: 'Your email has been saved. We will write to you soon.'
        }
    },
    pl: {
        nav: {
            home: 'Start',
            feature: 'Zalety',
            testimonials: 'Rekomendacje',
            pricing: 'Cennik',
            question: 'Pytania',
        },
        header: {
            l1: 'Zautomatyzuj',
            l2: 'umawianie spotkań',
            l3: 'z serwisów',
            l4: 'randokwych',
            sub: 'Zapisz się',
            news: 'do naszego newslettera, aby otrzymywać szybkie aktualizacje i wiadomości',
            email: 'Twój Adres Email...'
        },
        features: {
            header: 'Zalety',
            list: [
                {
                    header: 'Oszczędzasz czas',
                    paragraph: 'Oszczędź swój cenny czas na klikaniu i wykorzystaj go na spotkania'
                },
                {
                    header: 'Realne spotkania',
                    paragraph: 'Omiń patrzenie na awatary i ciesz się przebywaniem z żywą osobą'
                },
                {
                    header: 'Ulepszanie zdjęć',
                    paragraph: 'Nasi eksperci sprawdzą, że twoje zdjęcia będą perfekcyjne'
                },
                {
                    header: 'Uczenie maszynowe',
                    paragraph: 'Używaj sztucznej inteligencji do flirtowania przez internet'
                }
            ]
        },
        video: {
            q1: "Problem",
            a1: "Chcesz spędzić wieczór z dziewczyną, ale nie masz kiedy jej poznać",
            q2: "Rozwiązanie",
            a2: "Umów się z nią przez internet nie ryzykując czasu na pisanie z nią",
            q3: "Jak to działa",
            a3: "Wysyłasz zdjęcia i wolne terminy, nasi eksperci umawiają spotkanie",
            q4: "Chcę to mieć",
            a4: "Świetnie, zapoznaj się z naszym cennikiem i wybierz odpowiedni pakiet"
        },
        why: {
            header: 'Dlaczego wybierasz nas',
            first: {
                header: 'Spotykasz żywe osoby',
                paragraph: 'Umówisz się z kobietami o których nie śniłeś, nie rezygnując z niczego co kochasz, bez szukania ich i zastanawiania się co napisać'
            },
            second: {
                header: 'Nie tracisz czasu',
                paragraph: 'Wiemy jak wykryć osoby nie korzystające z portali randkowych w celach spotkań, wiemy co im napisać aby nie mogły doczekać poznania Ciebie'
            },
            third: {
                header: 'Doradztwo eksperta',
                paragraph: 'Doradzimy Ci jak przygotować sypialnię, które fryzury są modne, jakie tematy do rozmowy są najlepsze, jak obniżać głos...'
            }
        },
        testimonials: {
            header: 'Rekomendacje',
            list: [
                {
                    paragraph: 'Kiedy zacząłem korzystać z aplikacji randkowych, moim celem było poznawanie fajnych kobiet, a nie klikanie w zdjęcia i siedzenie z nosem w telefonie. Dzięki auto-dating.pl używanie serwisów randkowych ponownie ma dla mnie sens.',
                    name: 'Adam',
                    age: '22'
                },
                {
                    paragraph: 'Przed skorzystaniem z serwisu miałem umiarkowane rezultaty. Zdarzało się umówić na spotkanie, ale zawsze czułem, że znaczna część rozmów nie prowadzi do niczego konstruktywnego. Teraz skupiam się tylko na relacjach z kobietami, które chcą się ze mną spotkać, a na żywo łatwo nawiązać znacznie głębszą relację. Jestem bardziej zadowolony z mojego życia towarzyskiego, bo zamiast pisania z nieznajomymi kobietami mogę spotkać się z prawdziwymi znajomymi.',
                    name: 'Albert',
                    age: '35'
                },
                {
                    paragraph: 'Odkąd pamiętam bardzo ceniłem swój czas. Portale randkowe miały w założeniu pomóc w umawianiu się z ciekawymi ludźmi, ale odnosiłem wrażenie, że osoby z nich korzystające chcą pisać w nieskończoność zamiast się spotkać i po 15 minutach wiedzieć, czy jest chemia czy nie. Serwis autodating.pl robi to co powinny umożliwiać serwisy randkowe, ale nie wymaga tracenia czasu na nie prowadzące do nikąd konwersacje.',
                    name: 'Roland',
                    age: '27'
                }
            ]
        },
        pricing: {
            header: 'Cennik',
            buy: 'Kupno',
            list: [
                {
                    name: 'Podstawowy',
                    price: price('pl')[0]+' zł',
                    up: 'Do 1,500 kliknięć miesięcznie',
                    photo: 'Jedno poprawione zdjęcie',
                    stats: 'Dostęp do podstawowych statystyk',
                },{
                    name: 'Standardowy',
                    price: price('pl')[1]+' zł',
                    up: 'Do 5,000 kliknięć miesięcznie',
                    photo: 'Dwa poprawione zdjęcia',
                    stats: 'Statystyki w stosunku do średnich wyników',
                    open: 'Możliwość tworzenia własnych otwarć',
                },{
                    name: 'Premium',
                    price: price('pl')[2]+' zł',
                    up: 'Do 12,000 kliknięć miesięcznie',
                    photo: 'Pięć poprawionych zdjęć',
                    stats: 'Szczegółowe statystyki każdego kliknięcia',
                    open: 'Prywatne, tajne unikalne otwarcia rozmów',
                    bonuses: 'Szybszy dostęp do naszych materiałów'
                },
            ]
        },
        available: {
            header: 'Skoncentruj się na przeżywaniu',
            paragraph: 'Z nami już nigdy nie odczujesz frustracji związanej z wykonywaniem powtarzalnych czynności w celu umówienia spotkania przez internet. Zwróć swoją uwagę w stronę życia, a nie telefonu.'
        },
        faq: {
            header: 'Częste pytania',
            list: [
                {
                    q: 'Jak to działa?',
                    a: 'Nasza współpraca wymaga podania przez Ciebie imienia, kródkiej charakterystyki towjego stylu bycia, wysłania kilku zdjęć, określenia wolnych godzin na spotkania i miejsca. W naszym zakresie jest założenie Ci kont w stosownych serwisach randkowych i wykonywanie konwersacji. Umówione spotkania będą dodawane do Twojego kalendarza i będziesz otrzymywał powiadomienia z nimi związane.'
                },{
                    q: 'W jaki sposób umawiacie spotkania tak tanio?',
                    a: 'Wszystko dzięki automatyzacji. Rozmowy prowadzone są przez naszego eksperta jedynie w przypadku eksploracji nowych drzew dialogowych. Dzięki niesamowitemu postępowi który dokonał się w tej dziedzinie coraz trudniej odróżnić pisanie z maszyną od pisania z człowiekiem, a nasz algorytm ma do nauki skutecznego umawiania spotkań doświadczenia zebrane na wszyskich konwersacjach wszystkich klientów.'
                },{
                    q: 'Jak mogę wpływać na konwersację?',
                    a: 'W przpypadku pakietów standard oraz premium są to specjalne rozpoczęcia. Poza tym charakteryzując swój styl bycia pozwalasz nam na dostosowanie do niego odpowiedniego słownictwa. Poza tym raczej nie ma sensu skupiać się na tym, ponieważ prawdziwa relacja zaczyna się dopiero na spotkaniu, pisanie tekstu traktować należy jedynie jako filter, a nie narzędzie do budowania więzi.'
                },{
                    q: 'Czy sosowanie bota jest etyczne?',
                    a: 'Wszystko zależy od tego co jest Twoją intencją. Jeśli jest nią dzielenie się tym co dobre z drugą osobą, to naszą platformę można traktować jak samochód - przyśpiesza dotarcie do określonego punktu. Wierzymy, że dzielenie się uśmiechem twarzą w twarz jest dobre, a gapienie w telefon nie, dlatego jesteśmy dumni, że możemy tworzyć i samodzielnie korzystać z tej platformy.'
                },
            ]
        },
        modal: {
            header: " Dziękujemy za chęć zakupu!",
            paragraph1: "Mamy dla Ciebie świetną wiadomość. Ponieważ nasza usługa przechodzi obecnie testy dostaniesz od nas pierwszy miesiąc korzystania z systemu za darmo.",
            paragraph2: "Wpisz e-mail i zatwierdź, skontatkujemy się z Tobą i ustalimy jakie dziewczyny, gdzie i kiedy umawiamy.",
            confirm: 'Twój email został zapisany. Niedługo do Ciebie napiszemy.'
        }
    }
};

const getLang = () => {
    // let lang = (new URL(document.location)).searchParams.get('lang');
    // if(!lang) {
    //     lang = navigator.language.substr(0,2);
    // }
    // return ["pl", "en"].includes(lang) ? lang : "en";

    // because of we can have different navigator.language and $SERVER[HTTP_ACCEPT_LANGUAGE]
    // https://stackoverflow.com/questions/45310476/http-accept-language-differs-from-navigator-language-in-firefox-in-linux
    return window.$czater.language;
};

// Create VueI18n instance with options
const i18n = new VueI18n({
    locale: getLang(), // set locale
    messages, // set locale messages
});

// Now the app has started!
new Vue({
    i18n,
    el: '#app',
    data: {
        showModal: false,
        orderId: undefined,
        userEmail: ''
    },
    methods: {
        changeLangTo(to) {
            to = ["pl", "en"].includes(to) ? to : "en";
            this.$i18n.locale = to;
            window.$czater.language = to;
        },
        buy(qty) {
            console.log(qty);

            const self = this;

            axios.get(`/buy/${qty}/${PRICE_BASE}?visitId=${window.VISIT_ID}`).then(function (response) {
                console.log("Bought", response);

                self.orderId = response.data.id;
                self.showModal = true;

            }).catch(function (error) {
                    console.log(error);
            });
        },
        confirmOrder() {
            this.showModal = false;

            if(this.orderId) {

                axios.get(`/confirm/${this.orderId}?email=${this.userEmail}&visitId=${window.VISIT_ID}`).then(function (response) {
                    console.log("Confirmed", response);

                    window.toastr.success(messages[getLang()].modal.confirm);

                }).catch(function (error) {
                    console.log(error);
                });

            }
        }
    }
});