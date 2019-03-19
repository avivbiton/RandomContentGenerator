Simple but customizable content generation for whatever reason you may need it (inspiration, random infinite content, and more).

## How it works
You feed RCG a Schema and it will output the content in JSON format. As simple as that.

An example of a very basic schema.
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
    { "projectTopic": "Travel", "Type": "Website", Language: "C#" }
```
## Usage

Define a schema and feed it into the constructor and then simply call build();
```javascript
    let generator = new ContentGenerator(schema);
    let json = generator.build();
```

## Docs
We offer full documentation over everything in RCG. But you don't have to go that far. Reading the first wiki page is enough to get you started. After that, each page you read will give more tools to customize your schemas the way you want to.

## A little dive into the library
RCG uses "Parsers" to read the schema. The library will read the schema and divide it into data objects and then find the first valid parser for the object, after finding the right parser, we tell it to parse the data and return the result.   
If you wish to dive deeper visit our wiki section.

## Work In Progress
This is a very early version of the package and may contain bugs and heavy changes in the future. use at your own risk.
