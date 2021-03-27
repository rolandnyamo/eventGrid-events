const { v4: uuidv4 } = require('uuid');
var faker = require('faker');

module.exports = async function (context, req) {
    
    context.log('Building event ... ');

    let org = 'MyOrg', 
        appName= `${getAppName()}`, 
        topic = `${org}.${appName}`, 
        sub = `${appName}.${faker.lorem.word(4)}.things.${faker.lorem.word(8)}`,
        eventType = `${org}.${appName}.${getEventType()}`;
        
        var orderDetails = null
        eventType.includes('NewOrder') ? orderDetails = {
            product: faker.commerce.product(),
            price: faker.commerce.price(),
            payment: {
                cc: {
                    num: faker.finance.creditCardNumber(),
                    cvv: faker.finance.creditCardCVV(),
                    expires: faker.date.future(2)
                }
            }
        } : null

    try {
        var myEvent = {
            topic: topic,
            subject: sub,
            eventType,
            id: uuidv4(),
            data:{
                [`${faker.lorem.word(6)}`]: `${faker.lorem.word(12)}`,
                details: {
                    name: faker.name.findName(),
                    address: {
                        street: faker.address.streetAddress(true),
                        city: faker.address.city(),
                        state: faker.address.state(true),
                        zipCode: faker.address.zipCode()
                    },
                    orderDetails
                },
                url: `${faker.image.imageUrl(500, 600)}`,
                website: `https://${faker.internet.domainName()}`,
                techDetails: [{ip: `${faker.internet.ip()}`, ipv6: `${faker.internet.ipv6()}`}],
            },
            dataVersion: Math.floor(Math.random() * 5),
            metadataVersion: Math.floor(Math.random() * 20),
        }
    
    } catch (error) {
        context.log(error)

        var myEvent = null
        var err = {message: `error`, details: error}
    }
    
    context.log('event built');
    context.log(myEvent)

    context.res = {
        status: myEvent ? 200 : 500, /* Defaults to 200 */
        body: myEvent ? myEvent : err,
        headers : {
            'content-type': 'application/json'
        }
    };
}

function getAppName(){
    let topic_list = ['OrgMsg', 'SAP', 'Auth', 'Purchasing', 'OMS', 'SupplierMgmt'],
    i = Math.floor(Math.random() * topic_list.length);

    return topic_list[i]

}

function getEventType(){
    let subject_list = ['NewEmailMessage', 'NewOrder', 'UnusualAuthenticationRequest', 'NewSupplier', 'RemoveSupplier', 'NewProduct'],
    i = Math.floor(Math.random() * subject_list.length);

    return subject_list[i]
}