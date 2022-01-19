#flask imports

#lib imports
from flask_sqlalchemy import SQLAlchemy

#my imports

db = SQLAlchemy()

def configure(app):
    db.init_app(app)
    app.db = db
    
class Pessoas(db.Model):
    id_pessoa = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    rg = db.Column(db.String(100), nullable=False)
    cpf = db.Column(db.String(100), nullable=False)
    data_nascimento = db.Column(db.Date, nullable=False)
    data_admissao = db.Column(db.Date, nullable=False)
    funcao = db.Column(db.String(100), nullable=True)