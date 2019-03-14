# Random Content Generator (RCG)

Generate a random content based on a schema can be used as an inspiration or real-time content generation for your projects.
RCG was designed to fit for every type of project thanks to custom schemas that will allow you to customize the content generation to fit your project. The content will be parsed to JSON format.

# How it works

You need to define a schema first. A schema can be very simple or extremely complex it all depends on your personal needs.  
a schema has a property called "fields". Each field will be generated into the final result.  
The generator use different types of parses to pick or generate the content.  
The most basic parser (Which, technically, is not even parser) will just pick a random string out of a array of strings.

An example of very basic schema (no parsers)

    {
        "fields":{
            "projectTopic": ["Cooking", "Travel", "Job Search"],
            "type": ["Microservice", "Website", "Backend server"],
            "Language": ["Typescript", "C#", "Python"]
        }
    }

The generator will pick one of each at random and generate a random result, for example:

    { "projectTopic": "Travel", "Type": "Website", Language: "C#" }

# Parsers

Just picking random values is often not enough, you may want more control over the generated content, this is where the Parsers comes in.  
Here we have a simple parser called MinMaxParser. This parser will take a min (inclusive) and max (exclusive) values and generate a random number.
To use it, we need to define an object as the value of field

    {
        "fields":{
            "MonsterName": ["Dragon", "Goblin", "Monster"],
            "Health": {
                "min": 100,
                "max": 500
            }
        }
    }

The generator will detect the object passed into the health field and let the MinMaxParser generate a random number.
The result:

    {"MonsterName":"Goblin","Health":"379"}

There are more types of Parsers, see the wiki section for more information (THIS WILL COME SOON)

# Usage

Using the generator is actaully easy, just include the package in your project and define a schema.

    let generator = new ContentGenerator(schema);
    let json = generator.build();

# Work In Progress

This is very early version of the package and may contain bugs and heavy changes in the future. use at your own risk.
