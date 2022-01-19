#flask imports
from flask import Blueprint, current_app, request, jsonify

#lib Imports
from .serealizer import PessoasSchema
from .model import Pessoas

bp_pessoas = Blueprint("pessoas", __name__,)

@bp_pessoas.route("/pessoas/", methods=["GET"])
def get_pessoa():
    ps = PessoasSchema(many=True)
    pessoas = Pessoas.query.all().with_entities(Pessoas.nome, Pessoas.data_admissao)
    status_code = 200 if pessoas != [] else 404
    return  ps.jsonify(pessoas), status_code

@bp_pessoas.route("/pessoas/<nome>/", methods=["GET"])
def get_pessoa_by_id(nome):
    ps = PessoasSchema() 
    pessoa = Pessoas.query.filter(Pessoas.nome == nome).with_entities(Pessoas.nome, Pessoas.data_admissao).first()
    message, status_code = (  pessoa, 200 ) if pessoa != None else ( {"Pessoa não encontrada!!"}, 404 )
    return ps.jsonify(message), status_code 
    
@bp_pessoas.route("/pessoas/", methods=["POST"])
def post_pessoa():
    ps = PessoasSchema()
    pessoa = ps.load( request.json  ) 
    current_app.db.session.add(pessoa)
    current_app.db.session.commit()
    return  ps.jsonify(pessoa), 201 

@bp_pessoas.route("/pessoas/<pk>/", methods=["PATCH"])
def update_pessoa(pk):
    ps = PessoasSchema()
    query =  Pessoas.query.filter(Pessoas.id_pessoa == pk)
    print(
        query
    )
    query.update(request.json)
    current_app.db.session.commit()
    return ps.jsonify( query.first() )
    
@bp_pessoas.route("/pessoas/<id>/", methods=["DELETE"])
def delete_pessoa(pk):
    pessoa = Pessoas.query.filter(Pessoas.id_pessoa == pk)
    affected = pessoa.delete()
    message, status_code =( {"message": "Usuário não encontrado!", }, 404  ) if affected == 0  else ( {"message": "Registro deletado com sucesso!", }, 200  )
    current_app.db.session.commit()
    return jsonify(message), status_code