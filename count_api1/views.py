import json
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie


@ensure_csrf_cookie
def calculitar(request, choose):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            a = int(data.get("A"))
            b = int(data.get("B"))
            if choose == 'add':
                answer = a + b
            elif choose == 'subtract':
                answer = a - b
            elif choose == 'multiply':
                answer = a * b
            elif choose == 'divide':
                try:
                    answer = a / b
                except ZeroDivisionError:
                    return JsonResponse({'error': 'Division by zero error'}, status=400)
            else:
                return JsonResponse({'error': 'Something wrong'}, status=400)
            return JsonResponse({'answer': answer})
        except ValueError:
            return JsonResponse({'error': 'Wrong input'}, status=400)
        except ZeroDivisionError:
            return JsonResponse({'error': 'Division by zero'}, status=400)
    return JsonResponse({'error': 'Invalid request'}, status=400)


def add(request):
    return calculitar(request, 'add')


def subtract(request):
    return calculitar(request, 'subtract')


def multiply(request):
    return calculitar(request, 'multiply')


def divide(request):
    return calculitar(request, 'divide')
