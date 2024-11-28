# TODO APP
A [todo app project](https://www.udemy.com/course/learn-javascript-full-stack-from-scratch/) from Brad Schiff in Udemy.

## Running Local Development

### Prerequisites
- Docker
- Node

### CLI Commands
```bash 
docker compose up watch 
```

### Web URLs
- [Todo Web App](http://localhost:8080)
- [Mongo Express](http://localhost:8081)

### Fixes of issues encountered during development

#### Express Typescript

1. During build, directories does not match with the development e.g @todo-app/lib-interfaces/index.js is not found.

    Causes:
    - build target
    - tsconfig.json
        - build target is different during build and development
        - verbatimModuleSyntax property is set to true
    
    Fixes:
    - In the package.json of libraries, map the index.js to the lib entrypoint.
        ```json 
        {
            "exports": {
                "./index.js": "./dist/index.js"
            }
        }
        ```

2. Since this project is bundled by typescript scripts appends 'export {}' at the end of the scripts inside directory set as static (front end javascript scripts).

    Cause:
    - package.json and tsconfig.json type and target is not commonjs respectively

    Fixes:
    - Set the type attribute of the script to module.
    ```html
        <script src="/browser.js" type="module" defer></script>
    ```