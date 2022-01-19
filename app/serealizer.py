from flask_marshmallow import Marshmallow
from .model import Pessoas

ma = Marshmallow()

def configure(app):
    ma.init_app(app)
    
class PessoasSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Pessoas 
        load_instance = True