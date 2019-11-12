<?php

namespace App\Controller\api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

class LoginController extends AbstractController
{
    /**
     * @Route("/api/v1/detail", name="login")
     */
    public function index()
    {
    	return new JsonResponse("hello user, please login with correct details!");
    }
}
