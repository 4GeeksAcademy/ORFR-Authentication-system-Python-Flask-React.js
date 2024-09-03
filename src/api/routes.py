"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

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

        return jsonify({"done":"se creo el usuario "+str(email)}), 200

    except Exception as e:
        return jsonify({"error": "error en el servidor "+str(e)}), 500