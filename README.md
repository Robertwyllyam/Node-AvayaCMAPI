# Avaya Communcation Manager (CM) Node JS Integration

This solution was built in order to facilitate usage of Avaya Communication Manager's SOAP API.

## How to use

Rename .env.example to .env.

You must fill .env data with your SMS (AES) host, Communication Manager (CM) SSH user and password in order to be able to peform API Calls.

Avaya SMS uses SOAP API, so we do instantiate a SOAP client with the provided credential and perform changes with it.

All you need to do is to fill the "performCMCall" function with the given parameters.

### About the parameters

The parameters are described in more details at Avaya SMS SDK API available at Avaya DevConnect Portal. I will present you with a brief overview of it.

- Operation
The action you want to do with the target object. For instance, if you want to get an Agent information, you use "display" operation.

- Qualifier
The filter parameter. You can use it with the operations to filter specific objects. For instance: You can use display operation with an Agent Login ID in order to show its details.

-Target
The model you want to perform the operation. It could an agent, authorization code, station or any object available at SMS API.

- TargetObject
The new version of the object you are performing the operation. For instance, if you want to change the class of restriction of an agent you could send it as {COR: '0'}. Display operations must be used with an empty object.


Example of An Agent Display:

```bash
  performCMCall("display", "1234", "Agent", {})
    .then(agent => console.log(agent))
    .catch(error => console.log(error))
```

The function above should retrieve you the agent with the LoginID 1234.


