"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required

api = Blueprint('api', __name__)

bcrypt = Bcrypt()
jwt = JWTManager()

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    usuario = User.query.get(id)
    
    return jsonify(usuario), 200

@api.route('/registrar', methods=['POST'])
def post_new_user():
    try:
        name = request.json.get("name"),
        email = request.json.get("email"),
        password = request.json.get("password")

        if not name or not email or not password:
            return jsonify({"error": "faltan campos obligatorios"}), 404

        verif_user = User.query.filter_by(email=email).first()
        if verif_user:
            return jsonify({"error": "el email ya esta registrado"}), 404
        
        password_encrypt = bcrypt.generate_password_hash(password).decode('utf-8')

        add_user = User(name=name, email=email, password=password_encrypt)

        db.session.add(add_user)
        db.session.commit()

        return jsonify({"done":"se creó el usuario "+str(email)}), 200

    except Exception as e:
        return jsonify({"error": "error en el servidor "+str(e)}), 500



@api.route('/login', methods=['POST'])
def get_login_and_token():
    try:
        email = request.json.get("email"),
        password = request.json.get("password")

        if not email or not password:
            return jsonify({"error": "completar campos obligatorios"}), 404

        verif_user = User.query.filter_by(email=email).first()

        if not verif_user:
            return jsonify({"error": "el usuario con el email "+str(email)+" no existe"}), 404
        
        
        password_encrypt = verif_user.password


        if (bcrypt.check_password_hash(password_encrypt, password)):
            token = create_access_token(identity=verif_user.id)
            print("bienvenid@ "+str(verif_user.name))
            return jsonify({"token": token, "name": verif_user.name, "email": verif_user.email}), 200
            
        else:
            return jsonify({"error": "la contraseña es incorrecta "}), 404

    except Exception as e:
        return jsonify({"error": "error en el servidor "+str(e)}), 500



@api.route('/user')
@jwt_required()

def get_Profile():
    current_user_id = get_jwt_identity()  #para 
    if (current_user_id):
        data_user = User.query.filter_by(id=current_user_id).first()
        return jsonify(data_user.serialize()), 200
    else:
        return jsonify({"error": "Debe iniciar sesion"}), 200
    