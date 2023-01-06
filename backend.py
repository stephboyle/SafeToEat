from flask import Flask, jsonify, make_response, request
from pymongo import MongoClient
from bson import ObjectId
import uuid, random
from flask_cors import CORS
import json
import bcrypt
import jwt
import datetime
from pathlib import Path
from functools import wraps

#from importlib_metadata import re
 
app = Flask(__name__)
 
client = MongoClient("mongodb://127.0.0.1:27017")

db = client.SafeToEat
users = db.users
blacklist = db.blacklist


# @app.route("/", methods=["GET"])
# def index():
#     return make_response("<h1>Hello World</h1>", 200)

# get user
@app.route("/api/v1.0/businesses/<string:id>", methods=["GET"])
def show_one_user(id):
    user = users.find_one({'_id':ObjectId(id)})
    if user is not None:
        # user["_id"] = str(user['_id'])
        # for review in business['reviews']:
        #     review['_id'] = str(review['_id'])
        return make_response( jsonify( user ), \
         200 )
    else:
        return make_response(  jsonify( {"error" : "Invalid user ID"} ), 404 )

# creating account
@app.route("/api/v1.0/users", methods=["POST"])
def add_user():
    next_id = users[-1]["id"] + 1
    new_user = { "_id": next_id,
                 "first_name": request.form["first_name"],
                 "last_name": request.form["last_name"],
                 "email_address": request.form["email_address"],
                 "password": request.form["password"],
                 "allergy": request.form["allergy"]
                 }
    users.append(new_user)
    return make_response( jsonify( new_user ), 201) 

# editing account details
@app.route("/api/v1.0/users/<int:id>", methods=["PUT"])
def edit_user(id):
    for user in users:
        if user["id"] == id:
            user["first_name"] = request.form["first_name"]
            user["last_name"]: request.form["last_name"]
            user["email_address"]: request.form["email_address"]
            user["password"]: request.form["password"]
            user["allergy"]: request.form["allergy"]
            break
    return make_response( jsonify( user ), 200)

# deleting account
@app.route("/api/v1.0/users/<int:id>", methods=["DELETE"])
def delete_user(id):
    for user in users:
        if user["id"] == id:
            users.remove(user)
            break
    return make_response( jsonify( {} ), 200)

# # auth user login
# @app.route('/api/v1.0/login', methods=['GET'])
# def login():
#     auth = request.authorization
#     if auth:
#         hashed = bcrypt.hashpw(auth.password.encode('utf-8'), bcrypt.gensalt())

#         user = users.find_one({'username': auth.username})
#         if user is not None:
#             if bcrypt.checkpw(user["password"].encode('utf-8'), hashed):
#                 token = jwt.encode({'user': auth.username, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])
#                 return make_response(jsonify({'token': token.decode('UTF-8')}), 200)
#             else:
#                 return make_response(jsonify({'message': 'Bad password'}), 401)
#         else:
#             return make_response(jsonify({'message': 'Bad username'}), 401)
#     return make_response(jsonify({'message': 'Authentication required'}), 401)

@app.route('/api/v1.0/login', methods=['GET'])
def login():
    auth = request.authorization
    if auth and auth.password == 'password':
        token = jwt.encode( \
            {'user' : auth.username, \
             'exp' : datetime.datetime.utcnow() + \
                    datetime.timedelta(minutes=30)}, \
            app.config['SECRET_KEY'])
        return jsonify({'token' : token.decode('UTF-8')})

    return make_response('Could not verify', 401, \
        {'WWW-Authenticate' : \
            'Basic realm = "Login required" '})
        

# # logout
# @app.route('/api/v1.0/logout', methods=["GET"])
# # @jwt_required
# def logout():
#     token = request.headers['x-access-token']
#     blacklist.insert_one({"token":token})
#     return make_response(jsonify({'message' : 'Logout successful'}), 200)


if __name__ == "__main__":
    #businesses = generate_dummy_data()
    app.run(debug=True)
