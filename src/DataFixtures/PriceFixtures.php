<?php

namespace App\DataFixtures;

use App\Entity\BasePrice;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class PriceFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $price = new BasePrice();
        $price->setId(1);
        $price->setValue(3);
        $manager->persist($price);

        $manager->flush();
    }
}