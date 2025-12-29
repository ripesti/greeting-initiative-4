import json
import os
from datetime import datetime
import psycopg2

def handler(event: dict, context) -> dict:
    '''API для приема заявок и отзывов с сайта'''
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        
        name = body.get('name', '')
        phone = body.get('phone', '')
        email = body.get('email', '')
        service = body.get('service', '')
        message = body.get('message', '')
        status = body.get('status', 'new')
        user_id = body.get('user_id')
        
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO applications (name, phone, email, service, message, status, user_id)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            RETURNING id, created_at
        ''', (name, phone, email, service, message, status, user_id))
        
        result = cursor.fetchone()
        application_id = result[0]
        created_at = result[1]
        
        conn.commit()
        cursor.close()
        conn.close()
        
        application_data = {
            'id': application_id,
            'name': name,
            'phone': phone,
            'email': email,
            'service': service,
            'message': message,
            'status': status,
            'user_id': user_id,
            'created_at': created_at.isoformat()
        }
        
        print(f"Новая заявка #{application_id}: {json.dumps(application_data, ensure_ascii=False)}")
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'message': 'Заявка успешно отправлена',
                'data': application_data
            }, ensure_ascii=False),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        print(f"Ошибка обработки заявки: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': False,
                'error': 'Ошибка сервера'
            }),
            'isBase64Encoded': False
        }