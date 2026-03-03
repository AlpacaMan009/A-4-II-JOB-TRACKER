# QnA

## 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

**Answer:**1. getElementsByID() is used for getting a specific element with the unique ID.  

           2. getElementsByClassName() is used for getting multiple elements with the same class name. 

           3. querySelector() is used for getting the first element matching a CSS selector. 

           4. querySelectorAll() is used for getting all the elements matching a CSS selector.

## 2. How do you create and insert a new element into the DOM?

**Answer:**
Let's say I want to create a div with a text content in it.

            const div = document.createElement("div")

            div.className = "card bg-red-300 p-5 rounded-lg"
            div.text = "New element in DOM"

            document.body.appendChild(div)

            or

            container.appendChild(div)  --> to add an element into a specific container

## 3. What is Event Bubbling? And how does it work?

**Answer:**
Event Bubbling is a DOM event where if a certain event is triggered somewhere then its parent, grandparent and other superior nodes are also triggered, all the way to the "root". Basically it is like a bubble which rises from the bottom of the glass to top.

## 4. What is Event Delegation in JavaScript? Why is it useful?

**Answer:**
Event delegation is a form of way where a single event handles the work of multiple children. For the assignment project, it was this -

     document.addEventListener("click", function (event) {

         if (event.target.classList.contains("interview-btn")) {

            <!-- rest of the code -->


## 5.  What is the difference between preventDefault() and stopPropagation() methods?

**Answer:**
 preventDefault() basically prevents a specific event from happening in the event listener while the other events work fine without any interruption.

 stopPropagation() is basically used to stop an event bubble from happening. If I call this function on a child node, then the propagation will stop right there and it won't reach the parent nodes.
