# Privacy Sandbox Demos

Privacy Sandbox Demos is a web application that showcases various demos and scenarios related to privacy sandbox.

## Description

Privacy Sandbox Demos is a web application built using Node.js and Express. It demonstrates different privacy-related
technologies and scenarios through various demos and use cases.

The project is structured into two main sections:

1. **Demo Types**: These are categorized demos, each showcasing a specific privacy technology.
2. **Scenarios**: These demos represent real-world scenarios where privacy technologies can be applied.

## Getting Started

### Prerequisites

Before you can run the Privacy Sandbox Demos, make sure you have the following software installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Installation

1. Clone this repository to your local machine:

    ```bash
    git clone <https://github.com/yourusername/privacy-sandbox-demos.git>
    ```

2.

Navigate to the project directory:

 ```bash
 cd privacy-sandbox-demos
 ```

3. Install project dependencies:
    ```bash
    npm install
    ```

## **Configuration**

The project uses environment variables for configuration. You can configure the following variables in a **`.env`**
file:

- **`protocol`**: The protocol used for the application (e.g., **`http`** or **`https`**).
- **`domain-a`**: The domain A for your application.
- **`domain-b`**: The domain B for your application.
- **`domain-c`**: The domain C for your application.
- **`port`**: The port number on which the server will run.

_You can use `localhost` for the domains if you are running the application locally._

## **Usage**

To run the Privacy Sandbox Demos application, use the following command:

```bash
npm start
```

The application will be accessible at **[http://localhost:yourport](http://localhost:yourport/)**, where **`yourport`**
is the port number specified in your environment configuration.

## **Demo Types**

### **CHIPS**

This demo showcases the use of **CHIPS** (**C**ookies **H**aving **I**ndependent **P**artitioned **S**tate) to store
cookies as partitioned cookies tied to the top-level site where it's initially set.

## **Scenarios**

### **Analytics - Cross-Domain Tracking**

This demo showcases the ability to track user interactions using third-party cookies when third-party services are
utilized. The demo consists of three domains - a first-party domain utilizing a third-party service, another first-party
domain also utilizing the third-party service, and the third-party analytics service domain.

**Domain Information**

* **domain-aaa.com**: The first-party domain using the third-party service.
* **domain-bbb.com**: Another first-party domain using the third-party service.
* **domain-ccc.com**: The third-party analytics service domain.

**Sequence Diagram**

```mermaid
sequenceDiagram
    participant Visitor
    participant DomainA
    participant DomainB
    participant DomainC
    
    Note over Visitor,DomainC: Current Behaviour
    
    Visitor->>DomainA: Visits
    DomainA->>DomainC: Requests tracking script from Domain C
    DomainC->>Visitor: Stores unique ID in cookie
    Visitor->>DomainB: Visits
    DomainB->>DomainC: Retrieves unique ID from cookie
    DomainC->>Visitor: Recognizes as the same visitor

    Note over Visitor,DomainC: After Third-party Cookie Deprecation
    
    Visitor->>DomainA: Visits
    DomainA->>DomainC: Unable to assign unique ID
    DomainC-->>Visitor: Cannot store ID (no cookie)
    Visitor->>DomainB: Visits
    DomainB->>DomainC: Cannot retrieve unique ID
    DomainC-->>Visitor: Treats as a new visitor
```

### **E-Commerce - Cross-Domain Shopping Cart**

This demo showcases the use of third-party cookies to store shopping cart information across domains while
utilizing a third-party ecommerce service. The primary goal is to test whether third-party ecommerce services can
still use third-party cookies to manage cart information across different domains.

**Domain Setup**

* **domain-aaa.com** - First-party domain utilizing the third-party ecommerce service.
* **domain-bbb.com** - Another first-party domain also utilizing the third-party ecommerce service.
* **domain-ccc.com** - The third-party ecommerce service domain.

**Sequence Diagram**

```mermaid
sequenceDiagram
    participant Visitor
    participant DomainA
    participant DomainB
    participant DomainC

    Visitor->>DomainA: Access homepage
    DomainA->>Visitor: Render homepage with embedded iframe to DomainC/products
    Visitor->>DomainC: Clicks on "Add to cart" for Product 1
    DomainC->>DomainC: Updates cart cookie
    DomainC->>Visitor: Updates cart icon count
    Visitor->>DomainC: Clicks on "Add to cart" for Product 2
    DomainC->>DomainC: Updates cart cookie
    DomainC->>Visitor: Updates cart icon count
    Visitor->>DomainB: Navigates to DomainB
    DomainB->>Visitor: Render homepage with embedded iframe to DomainC/products
    Visitor->>DomainC: Observes the same cart icon count as on domain-aaa.com
    Visitor->>DomainC: Navigates to cart
    DomainC->>DomainC: Fetches cart data from cookie
    DomainC->>Visitor: Displays cart contents (Product 1 and Product 2)
```

### **Embedded Content - Cross-Domain Embedded Content**

This demo is designed to showcase the behavior of third-party cookies within embedded content across different domains.
We use an embedded YouTube video as an example of third-party content. The demonstration helps users and developers
understand how third-party cookies function when interacting with content embedded from other domains.

**Domains Used:**

* **domain-aaa.com**: A first-party domain where the third-party service is being utilized.
* **domain-bbb.com**: Another first-party domain where the third-party service is being utilized.

**Sequence Diagram**

```mermaid
sequenceDiagram
    participant Visitor
    participant DomainA
    participant DomainB
    participant YouTube as YouTube Embed Player
    

    Visitor->>DomainA: Open DomainA
    activate DomainA
    DomainA->>YouTube: Load YouTube Embed Player
    activate YouTube
    Visitor->>YouTube: Play video
    YouTube->>Visitor: Stream video
    Visitor->>YouTube: Change preferences (quality, sound level, mute)
    YouTube->>Visitor: Apply preferences
    deactivate YouTube
    deactivate DomainA

    Visitor->>DomainB: Open DomainB
    activate DomainB
    DomainB->>YouTube: Load YouTube Embed Player
    activate YouTube
    Visitor->>YouTube: Play video
    YouTube->>Visitor: Stream video
    Note left of YouTube: Check for any existing preferences from previous interactions
    YouTube-->>Visitor: Display video with previous preferences (if any)
    deactivate YouTube
    deactivate DomainB

    Note over Visitor, DomainB: Verify if preferences are maintained across domains for the embedded content.
```

### **Single Sign-On - Cross-Domain Single Sign-On**

This demo showcases a basic implementation of a Single Sign-On (SSO) scenario where third-party cookies are used to
share login information across different domains.

**Domains Used:**

* **domain-aaa.com** - The first party domain using the third party service.
* **domain-bbb.com** - Another first party domain using the third party service.
* **domain-ccc.com** - The third-party single sign-on service.

**Sequence Diagram**

```mermaid
sequenceDiagram
    participant User
    participant DomainA
    participant DomainB
    participant DomainC

    User->>DomainA: Visit domain-aaa.com
    DomainA->>User: Render sign-in page
    User->>DomainA: Enter Email & Submit
    DomainA->>DomainC: Redirect to domain-ccc.com for SSO login
    DomainC->>User: Store email in third-party cookie
    DomainC->>DomainA: Redirect back to domain-aaa.com with login success
    DomainA->>User: Render profile page
    
    User->>DomainB: Visit DomainB
    DomainB->>DomainC: Check third-party cookie for login info
    DomainC->>DomainB: Confirm user is logged in
    DomainB->>User: Render profile page
```
