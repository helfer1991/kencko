This is a tech challenge for Kencko using NextJS (version 14) and Typescript.
I've used both tailwind and CSS modules. Initially I started with tailwind to speed up the development, but resorted to CSS modules, because I find them easier to read, especially when applying more stylized components.
Used a mix of server components and client components. I'm fetching data from a server component to show the list of products. For the cart, as it naturally requires a client component to allow the interaction of the button on the navbar to open the cart and the usual styling of having it sliding from the right to the left (in desktop), or from the bottom to top (in small screen) requires client side rendering.

I was having issues with fetching data from the provided endpoint on the client component, hence I created an API route to fetch the data from there.

The persistence of data accross refreshes, or even closing and opening the browser, was done through Local Storage, as is done on the Kencko website.

I've used the Context API to handle the shopping cart and the interactions with it.

Lucide-react for icons was my Icon library of choice.

No tests were included, as the suggested time made that task impossible to be done.
