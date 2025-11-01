from flask import Flask, request, jsonify
from flask_cors import CORS  
import mysql.connector
from werkzeug.security import generate_password_hash
import os

app = Flask(__name__)
CORS(app) 

DB_CONFIG = {
    'host': 'localhost',
    'user': 'root', 
    'password': '',        
    'database': 'parcialpracticas'
}

def get_db_connection():
    """Establece la conexión a la base de datos usando mysql.connector."""
    try:
        return mysql.connector.connect(**DB_CONFIG)
    except mysql.connector.Error as err:
        print(f"Error de conexión a MySQL: {err}")
        return None

# RUTA PARA MOSTRAR LA PÁGINA
@app.route('/')
def index():
    """Sirve el archivo paginaprincipal.html."""
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(BASE_DIR, 'paginaprincipal.html')
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        return f"ERROR 404: Archivo paginaprincipal.html no encontrado. Se buscó en: {file_path}", 404

# RUTA PARA EL REGISTRO DE USUARIO-
@app.route('/registrar', methods=['POST'])
def registrar_usuario():
    """
    Recibe los datos del formulario HTML y los inserta en la tabla usuario.
    """
    nombre = request.form.get('nombre_registro')
    email = request.form.get('email_registro')
    password_cruda = request.form.get('password_registro')
    confirm_password = request.form.get('confirm_password_registro')

    if password_cruda != confirm_password:
        return jsonify({'error': 'Las contraseñas no coinciden.'}), 400

    password_hash = generate_password_hash(password_cruda)

    conn = get_db_connection()
    if conn is None:
        return jsonify({'error': "Error interno del servidor al conectar con la base de datos."}), 500

    try:
        cursor = conn.cursor()
        
        sql = "INSERT INTO usuario (nombre, email, password) VALUES (%s, %s, %s)"
        valores = (nombre, email, password_hash)
        
        cursor.execute(sql, valores)
        conn.commit()
        cursor.close()
        
        return jsonify({'message': 'Registro exitoso'}), 200 

    except mysql.connector.Error as err:
        conn.rollback() 
        return jsonify({'error': f"Error de Base de Datos: {err.msg}"}), 400
            
    finally:
        conn.close()

if __name__ == '__main__':
    app.run(debug=True)
