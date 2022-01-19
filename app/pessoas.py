#python imports
from datetime import datetime

#flask imports
from flask import Blueprint, current_app, request, jsonify
from flask import render_template
#lib Imports
from .serealizer import PessoasSchema
from .model import Pessoas

bp_pessoas = Blueprint("pessoas", __name__,)

@bp_pessoas.route("/", methods=["GET"])
def index():
    return render_template("index.html")

@bp_pessoas.route("/pessoas/", methods=["GET"])
def get_pessoa():
    ps = PessoasSchema(many=True)
    pessoas = Pessoas.query.with_entities(Pessoas.id_pessoa, Pessoas.nome, Pessoas.data_admissao).all()
    status_code = 200 if pessoas != [] else 404
    return  ps.jsonify(pessoas), status_code

@bp_pessoas.route("/pessoas/<pk>/", methods=["GET"])
def get_pessoa_by_name(pk):
    ps = PessoasSchema() 
    message_or_data, status_code = ( {"message":"Pessoa não encontrada!!"}, 404 )
    pessoa = Pessoas.query.filter( Pessoas.id_pessoa == pk ).first()
    if pessoa != None: 
        message_or_data, status_code = (  ps.jsonify(pessoa) , 200 )    
    return message_or_data, status_code 
    
@bp_pessoas.route("/pessoas/", methods=["POST"])
def post_pessoa():
    ps = PessoasSchema()
    pessoa = ps.load( request.json  ) 
    current_app.db.session.add(pessoa)
    current_app.db.session.commit()
    return  ps.jsonify(pessoa), 200 

@bp_pessoas.route("/pessoas/<pk>/", methods=["PATCH"])
def update_pessoa(pk):
    status_code, data, message_or_data = ( 404, request.json, "Não encontrado" )
    if Pessoas.query.filter(Pessoas.id_pessoa == pk).scalar() is not None :
        ps = PessoasSchema() 
        data["data_admissao"] = datetime.strptime( data["data_admissao"] ,"%Y-%m-%d")
        data["data_nascimento"] = datetime.strptime( data["data_nascimento"] ,"%Y-%m-%d")
        query =  Pessoas.query.filter(Pessoas.id_pessoa == pk)
        affected = query.update(data) 
        message_or_data, status_code = ( {"message": "Não atualizado"}, 400 )
        if affected > 0:
            status_code = 200
            current_app.db.session.commit()
            message_or_data = ps.jsonify( query.first() )
    return message_or_data, status_code
    
@bp_pessoas.route("/pessoas/<pk>/", methods=["DELETE"])
def delete_pessoa(pk):
    pessoa = Pessoas.query.filter(Pessoas.id_pessoa == pk)
    affected = pessoa.delete()
    message, status_code =( {"message": "Usuário não encontrado!", }, 404  ) if affected == 0  else ( {"message": "Registro deletado com sucesso!", }, 200  )
    current_app.db.session.commit()
    return jsonify(message), status_code