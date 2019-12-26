# API

```
/api/
    +- user
    |   |
    |   +- login  (POST)
    |   +- logout (POST)
    |
    +- sensors (GET)
        |
        +- get    (GET)
        +- update (POST)
```

```python
from flask import Flask, escape, request

@app.route('/api/user/login')
def login():
    name = request.args.get("name", "World")
    return f'Hello, {escape(name)}!'
```
