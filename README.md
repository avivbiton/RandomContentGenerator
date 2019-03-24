## Random Content Generator (RCG)
Simple but customizable random content generator. From simple and basic random content to advanced and complex.  
RCG gives you full control on how you want your content to be generated.

## Usage
Install the package on NPM  
`npm i random-content-generator`  

Create a schema to tell RCG how to generate the content. Here's an example of a very basic schema.

```json
    {
        "fields":{
            "projectTopic": ["Cooking", "Travel", "Job Search"],
            "type": ["Microservice", "Website", "Backend server"],
            "Language": ["Typescript", "C#", "Python"]
        }
    }
```
The generator will pick one of each at random and generate a random result, for example:
```json
    { "projectTopic": "Travel", "Type": "Website", "Language": "C#" }
```

In your code define a new ContentGenerator and pass the schema in the constructor. 
Calling the build() method will return the result as a string in JSON format.
```javascript
    let generator = new ContentGenerator(schema);
    let json = generator.build();
```

## Docs
We offer full documentation over everything in the library to make using and contributing to the library easy.  
You can access the docs in the wiki section where we explain how to use the library to its full potential and explaining how each system work.

## Contributing
Everyone is welcome to help in any way possible (even minor).  
If you modify the code, we do have a simple style guide to follow which can be found in the contributing section.  
*If you make a pull request that modifies the code you must request a pull request into the development branch first.*

## Work In Progress
This is a very early version of the package and may contain bugs and heavy changes in the future. use at your own risk.
