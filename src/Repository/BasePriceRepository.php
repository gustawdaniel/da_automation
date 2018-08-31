<?php

namespace App\Repository;

use App\Entity\BasePrice;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method BasePrice|null find($id, $lockMode = null, $lockVersion = null)
 * @method BasePrice|null findOneBy(array $criteria, array $orderBy = null)
 * @method BasePrice[]    findAll()
 * @method BasePrice[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BasePriceRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, BasePrice::class);
    }

//    /**
//     * @return BasePrice[] Returns an array of BasePrice objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('b.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?BasePrice
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
