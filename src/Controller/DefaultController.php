<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    /**
     * @Route("/", name="home_FE")
     * @Route("/{route}", name="vue_pages", requirements={"route"="^.+"})
     */
    public function index()
    {
        return $this->render('index.html.twig', [
            'controller_name' => 'DefaultController',
        ]);
    }
}
