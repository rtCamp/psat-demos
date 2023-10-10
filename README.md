# Privacy Sandbox Demos

Privacy Sandbox Demos is a web application that showcases various demos and scenarios related to privacy sandbox.

## Description

Privacy Sandbox Demos is a web application built using Node.js and Express. It demonstrates different privacy-related
technologies and scenarios through various demos and use cases.

The project is structured into two main sections:

1. **Demo Types**: These are categorized demos, each showcasing a specific privacy sandbox technology.
2. **Scenarios**: These demos represent real-world scenarios where privacy technologies can be applied.

## Getting Started

### Prerequisites

Before you can run the Privacy Sandbox Demos, make sure you have the following software installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Installation

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/rtCamp/privacy-sandbox-demos.git
    ```

2. Navigate to the project directory:

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
    participant User
    participant DomainA
    participant DomainB
    participant DomainC
    
    Note over User,DomainC: Current Behaviour
    
    User->>DomainA: Visits
    DomainA->>DomainC: Requests tracking script from Domain C
    DomainC->>User: Stores unique ID in cookie
    User->>DomainB: Visits
    DomainB->>DomainC: Retrieves unique ID from cookie
    DomainC->>User: Recognizes as the same User

    Note over User,DomainC: After Third-party Cookie Deprecation
    
    User->>DomainA: Visits
    DomainA->>DomainC: Unable to assign unique ID
    DomainC-->>User: Cannot store ID (no cookie)
    User->>DomainB: Visits
    DomainB->>DomainC: Cannot retrieve unique ID
    DomainC-->>User: Treats as a new User
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
    participant User
    participant DomainA
    participant DomainB
    participant DomainC

    Note over User,DomainC: Current Behaviour

    User->>DomainA: Access homepage
    DomainA->>User: Render homepage with embedded iframe to DomainC/products
    User->>DomainC: Clicks on "Add to cart" for Product 1
    DomainC->>DomainC: Updates cart cookie
    DomainC->>User: Updates cart icon count
    User->>DomainC: Clicks on "Add to cart" for Product 2
    DomainC->>DomainC: Updates cart cookie
    DomainC->>User: Updates cart icon count
    User->>DomainB: Navigates to domain-bbb.com
    DomainB->>User: Render homepage with embedded iframe to DomainC/products
    User->>DomainC: Observes the same cart icon count as on domain-aaa.com
    User->>DomainC: Navigates to cart
    DomainC->>DomainC: Fetches cart data from cookie
    DomainC->>User: Displays cart contents (Product 1 and Product 2)

    Note over User,DomainC: After third-party cookie deprecation

    User->>DomainA: Access homepage again
    DomainA->>User: Render homepage with embedded iframe to DomainC/products
    User->>DomainC: Clicks on "Add to cart" for Product 3
    DomainC-->>DomainC: Cannot set/update cart cookie
    DomainC->>User: Fails to update cart icon count or displays incorrect count
    User->>DomainB: Navigates to domain-bbb.com again
    DomainB->>User: Render homepage with embedded iframe to DomainC/products
    User->>DomainC: Observes cart icon with no items
    User->>DomainC: Navigates to cart
    DomainC-->>DomainC: Cannot fetch cart data from cookie
    DomainC->>User: Displays empty cart
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
    participant User
    participant DomainA
    participant DomainB
    participant YouTube

    Note over User,YouTube: Current Behaviour

    User->>DomainA: Navigate to DomainA/embedded-video
    DomainA->>YouTube: Load YouTube video
    User->>YouTube: Click play & mute

    User->>DomainB: Navigate to DomainB/embedded-video
    DomainB->>YouTube: Load YouTube video
    User->>YouTube: Click play
    YouTube-->>User: Retained settings & recognize user

    User->>YouTube: Check video history
    YouTube-->>User: Display videos from DomainA & DomainB

    User->>YouTube: Observe "watch later" button presence

    Note over User,YouTube: After third-party cookie deprecation

    User->>DomainA: Navigate to DomainA/embedded-video
    DomainA->>YouTube: Load YouTube video
    User->>YouTube: Click play

    User->>DomainB: Navigate to DomainB/embedded-video
    DomainB->>YouTube: Load YouTube video
    User->>YouTube: Click play & mute
    YouTube-->>User: Settings not retained

    User->>YouTube: Check video history
    YouTube-->>User: No videos from DomainA & DomainB

    User->>YouTube: "watch later" button absent
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

    Note over User,DomainC: Current Behaviour

    User->>DomainA: Visit domain-aaa.com
    DomainA->>User: Render sign-in page
    User->>DomainA: Enter Email & Submit
    DomainA->>DomainC: Redirect to domain-ccc.com for SSO login
    DomainC->>User: Store email in third-party cookie
    DomainC->>DomainA: Redirect back to domain-aaa.com with login success
    DomainA->>User: Render profile page
    
    User->>DomainB: Visit domain-bbb.com
    DomainB->>DomainC: Check third-party cookie for login info
    DomainC->>DomainB: Confirm user is logged in
    DomainB->>User: Render profile page

    Note over User,DomainC: After Third-Party Cookies Deprecation

    User->>DomainA: Visit domain-aaa.com
    DomainA->>User: Render sign-in page
    User->>DomainA: Enter Email & Submit
    DomainA->>DomainC: Redirect to domain-ccc.com for SSO login
    DomainC->>User: Attempt to store email in third-party cookie (Fails)
    DomainC->>DomainA: Redirect back to domain-aaa.com with login success
    DomainA->>User: Render profile page
    
    User->>DomainB: Visit domain-bbb.com
    DomainB->>DomainC: Check third-party cookie for login info (Fails)
    DomainB->>User: Render sign-in page (User needs to log in again)

```
