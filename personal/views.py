from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def home_screen_view(request):
    return Response({'message': 'Hello, world!'})