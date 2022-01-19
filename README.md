
### Dependências

- Python
- Flask
- SQLAlchemy
- Marshmallow
- PyMysql
- Bootstrap
- SweetAlert
- Pip


## Passos para executar a aplicação.
Caso esteja utilizando windows troque o python3 por python.

- Entre na pasta do projeto.
- Execute o comando python3 -m venv venv
- No caso do linux, ative a venv com source venv/bin/activate
- No caso do windows, ative a venv com venv/Scripts/Activate
- Execute o comando pip install -r requirements.txt
- Execute o comando flask run


## End-Points - Pessoas :
- End-Point

	> http://127.0.0.1:8000/pessoas/

- Verbo HTTP
	> GET

- Entrada
	> Sem Campo Obrigatório
	
- Saída
		[
    		{
        	"data_admissao": "2021-10-20",
        	"id_pessoa": 45,
        	"nome": "fioreze"
    		}, 
		]

- End-Point

	> http://127.0.0.1:8000/pessoas/1/

- Verbo HTTP
	> GET

- Entrada
	> PK Obrigatório
	
- Saída

		{
    		"cpf": "231123",
    		"data_admissao": "2021-10-20",
    		"data_nascimento": "2020-10-20",
    		"funcao": "123132",
    		"id_pessoa": 45,
    		"nome": "fioreze",
    		"rg": "31223"
		}

- End-Point

	> http://127.0.0.1:8000/pessoas/

- Verbo HTTP
	> POST

- Entrada
	> CPF, Data Admissão, Data Nascimento, Função, Nome e Rg todos são campos obrigatórios.
	
- Saída
		[
    		{
        	"data_admissao": "2021-10-20",
        	"id_pessoa": 45,
        	"nome": "fioreze"
    		}, 
		]

- End-Point

	> http://127.0.0.1:8000/pessoas/45/

- Verbo HTTP
	> PATCH

- Entrada
	> CPF, Data Admissão, Data Nascimento, Função, Nome e Rg todos são campos obrigatórios.
	
- Saída

		{
    		"cpf": "231123",
    		"data_admissao": "2021-10-20",
    		"data_nascimento": "2020-10-20",
    		"funcao": "123132",
    		"id_pessoa": 45,
    		"nome": "fioreze",
    		"rg": "31223"
		}


- End-Point

	> http://127.0.0.1:8000/pessoas/45/

- Verbo HTTP
	> DELETE

- Entrada
	> PK Obrigatório
	
- Saída

		{
    		Registro deletado com sucesso
		}




```sh
export FLASK_APP=__init__py
export FLASK_ENV=Development
export FLASK_DEBUG=True
```
