<?php
declare(strict_types=1);

namespace App\Web\Api;

use Psr\Http\Message\ResponseFactoryInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

final class EchoAction implements RequestHandlerInterface
{
    public function __construct(
        private ResponseFactoryInterface $responseFactory,
    ) {
    }

    public function handle(ServerRequestInterface $request): ResponseInterface
    {

        $rawBody = $request->getBody()->getContents();

        $data = json_decode($rawBody, true);

        if (!is_array($data)) {
            $data = [
                'error' => 'Invalid JSON',
                'raw' => $rawBody
            ];
        }

        $responseData = [
            'status' => 'success',
            'received' => $data,
            'method' => $request->getMethod(),
            'content_type' => $request->getHeaderLine('Content-Type')
        ];
        
        $payload = json_encode($responseData, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

        $response = $this->responseFactory->createResponse(200);
        $response->getBody()->write($payload);
        
        return $response->withHeader('Content-Type', 'application/json; charset=utf-8');
    }
}