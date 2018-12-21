# da_automation

Create database

     php bin/console doctrine:database:create

Update schema of base

    php bin/console doctrine:schema:update --force

And load fixtures with inital state

    php bin/console doctrine:fixtures:load
    
Set `PRECISE_SALE_API_KEY` to proper value in .env file - if not known ask @gustawdaniel

Run symfony PHP server

    php bin/console server:run

And in second terminal run browser

    firefox localhost:8000 &
    
Language can be now selected by URL eg.:

> http://localhost:8000/?lang=en

or

> http://localhost:8000/?lang=pl

Full docs of preparing development environment on link

(polish version)
> 
https://docs.google.com/document/d/1JNRf84_8phmdvOgTFsweIeBKy3HBsMzR6lOGoVHmjwg/edit?usp=sharing
