# Azure Event Grid Random Events
Generates random events in Azure Event Grid format.

* Demo: [get one event](https://get.events.az.rolandn.dev/getEvent)
* Demo: [get multiple events](https://get.events.az.rolandn.dev/getEvents)

API: 
* single event: GET `https://get.events.az.rolandn.dev/getEvent`
* multipe events (list): GET `https://get.events.az.rolandn.dev/getEvents?`. if you need more than 10 events, add querystring `count=n` where `n` is a number below 20.
