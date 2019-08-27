## Random Content Generator (RCG)
Simple but customizable random content generator. From simple and basic random content to advanced and complex.  
RCG gives you full control on how you want your content to be generated.

## 0.3 Update
0.3 update has some breaking changes. make sure the read the changes before updating.

### See it in action

Test the library on [code sandbox](https://6439jy0wzk.codesandbox.io/)

## Usage
Install the package on NPM  
`npm i randomcontentgenerator`  

Create a schema to tell RCG how to generate the content. Here's an example of a very basic schema.

```json
{
    "fields": [
        {
            "name": "Project Topic",
            "data": ["Cooking", "Travel", "Job Search"]
        },
        {
            "name": "Type",
            "data": ["Microservice", "Website", "Backend server"]
        },
        {
            "name": "Language",
            "data": ["Typescript", "C#", "Python"]
        }
    ]
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

The schema above is simple and often not enough. Here we have an example of more advanced schema.

```json
{
    "fields": [
        {
            "name": "Card Name",
            "data": {
                "text": [
                    "@{0} @g{0} Spell",
                    "@{0} @g{0} Spell",
                    "@{0} @g{0} Card"
                ],
                "properties": [
                    ["Awesome", "Weak"]
                ]
            }
        },
        {
            "name": "Description",
            "data": [
                "Deal @{0} @g{0} damage to the opponent",
                "Draw @{1} Cards",
                "Heal @{0} health"
            ],
            "properties": [
                {
                    "min": 20,
                    "max": 51
                },
                {
                    "min": 1,
                    "max": 6
                }
            ]
        },
        {
            "name": "Cost",
            "data": {
                "min": 0,
                "max": 11
            }
        }
    ],
    "globalProperties": [
        [
            "Fire",
            "Frost",
            "Earth"
        ]
    ]
}
```

This may seems like a lot but actually really simple when you take 5 minutes to understand it. More information is found at the wiki section.

## Docs
We offer full documentation over everything in the library to make using and contributing to the library easy.  
You can access the docs in the wiki section where we explain how to use the library to its full potential and explaining how each system work.

## Contributing
Everyone is welcome to help in any way possible (even minor).  
If you modify the code, we do have a simple style guide to follow which can be found in the contributing section.  
*If you make a pull request that modifies the code you must request a pull request into the development branch first.*

## Work In Progress
This is a very early version of the package and may contain bugs and heavy changes in the future. use at your own risk.
