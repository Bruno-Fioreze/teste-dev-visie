#flask imports
from flask import Flask

#lib imports
from flask_migrate import Migrate
from .model import configure as config_db
from .serealizer import configure as config_ma

def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:////tmp/app.db"
    app.config["SQLALCHEMY_DATABASE_URI"] = 'mysql+pymysql://walyssonpaiva:d2FseXNzb25w@jobs.visie.com.br/walyssonpaiva'
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    config_db(app)
    config_ma(app)
    
    Migrate(app, app.db)
    
    from .pessoas import bp_pessoas
    app.register_blueprint(bp_pessoas)
    
    return app