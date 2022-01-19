#imports python
from datetime import date, datetime
#imports flask 
from .model import Pessoas

#import libs
from flask_marshmallow import Marshmallow
from marshmallow import  validates, fields, pre_load
from marshmallow.exceptions import ValidationError
#my imports

ma = Marshmallow()

def configure(app):
    ma.init_app(app)
    
class PessoasSchema(ma.SQLAlchemyAutoSchema):
    
    class Meta:
        model = Pessoas 
        load_instance = True
        
            
    rg = fields.Str(Missing=None)
    cpf = fields.Str(Missing=None)
    data_nascimento = fields.Date(Missing=None)
    