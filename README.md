# da_automation

Create database

     php bin/console doctrine:database:create

Update schema of base

    php bin/console doctrine:schema:update --force

And load fixtures with inital state

    php bin/console doctrine:fixtures:load

Run symfony PHP server

    php bin/console server:run

And in second terminal run browser

    firefox localhost:8000 &
    
Language can be now selected by URL eg.:

> http://localhost:8000/?lang=en

or

> http://localhost:8000/?lang=pl