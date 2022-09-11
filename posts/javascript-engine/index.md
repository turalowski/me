---
title: 'JavaScript Foundation'
date: 'August 01, 2022'
author: 'Tural Hajiyev'
description: 'General information about how javascript works and what happens inside JS Engine'
tags:
  - education
  - learning
---


@[youtube](https://www.youtube.com/watch?v=xckH5s3UuX4)

# JavaScript Engine

![Image](http://localhost:3000/javascript-foundation/javascript-engine.png)

 ## Parser
Parsing means analyzing and converting a program into an internal format that a runtime environment can actually run, for example the JavaScript engine inside browsers.

The browser parses HTML into a DOM tree. HTML parsing involves tokenization and tree construction. HTML tokens include start and end tags, as well as attribute names and values. If the document is well-formed, parsing it is straightforward and faster. The parser parses tokenized input into the document, building up the document tree.

When the browser encounters CSS styles, it parses the text into the CSS Object Model (or CSSOM), a data structure it then uses for styling layouts and painting.

Parser knows the JavaScript rules and how it has to be written in order to be correct, to be valid. And if you make some mistakes, it basically throws an error and stops the execution.

If everything is correct though, then the parser produces a data structure known as the Abstract Syntax Tree, which is then translated into machine code. So this code is no longer JavaScript code, but a code, or let’s say a set of instructions, that can be executed directly by the computer’s processor. And it’s only when our code already converted to machine code, actually runs and does its work.

**@babel/parser** based on acorn, supports all new language features
shfit-ast parser produces Shift AST

**typescript** can parse JavaScript and TypeScript, producing it's own AST format for this

 ## AST
Abstract Syntax Tree (AST), is a tree representation of program source code.

[AST Example](https://astexplorer.net/)

**estree** - standard for EcmaScript AST;

**shift** - was designed with transformation in mind, not compatible with estree;

**babel** - supports language features which is have not yet become a standard, but have a proposal.

 ## Interpreter
 ## Compiler
# Writing Optimized Code

 ## eval()
```js
function foo(str) {
    var a = getAReallyBigArray();
    doSomethingWith(a);
    document.getElementById("foo").addEventListener('click', function() {
        alert(str);
    }, false);
}
```

According to the specification, the event handler function has a reference to the a variable (through the lexical environment object for the execution context) and so the array is kept in memory for as long as that event handler exists. But a JavaScript engine can analyze the event handler and determine that it definitely doesn't reference a, and so optimize the contents of the variable binding object and let the array get garbage collected.

But throw an eval in there:

```
function foo(str) {
    var a = getAReallyBigArray();
    doSomethingWith(a);
    document.getElementById("foo").addEventListener('click', function() {
        eval(str);
    }, false);
}
```

Now, it's impossible for the JavaScript engine to optimize the contents of the lexical environment object, so it has to keep the big array in memory, in case str has code in it that accesses it.

That's just one specific example. The fundamental point is that eval throws a great big spanner in the works for the JavaScript engine's optimizer, effectively making the engine turn off its optimizer for the code in which eval appears.

 ## arguments
 ## for in
 ## with
 ## delete
 ## Hidden classes
Since the use of dictionaries to find the location of object properties in memory is so inefficient, V8 uses a different method instead: hidden classes. Hidden classes work similarly to the fixed object layouts (classes) used in languages like Java, except they are created at runtime. While reading the rest of this post, keep in mind that V8 attaches a hidden class to each and every object, and the purpose of the hidden classes is to optimize property access time. Now, Lets take a look at what they actually look like.

```js
function Point(x,y) {
	this.x = x;
	this.y = y;
}
var obj = new Point(1,2);
```

Once the new function is declared, Javascript will create hidden class C0.

![Image](http://localhost:3000/javascript-foundation/hidden-classes-1.png)

 Everytime a new property is added to an object, the objects old hidden class is updated with a transition path to the new hidden class. Hidden class transitions are important because they allow hidden classes to be shared among objects that are created in the same way. If two objects share a hidden class and the same property is added to both of them, transitions ensure that both objects receive the same new hidden class and all the optimized code that comes with it.
```js
function Point(x,y) {
  this.x = x;
  this.y = y;
}
 
var obj1 = new Point(1,2);
var obj2 = new Point(3,4);
obj1.a = 5;
obj1.b = 10;
obj2.b = 10;
obj2.a = 5;
```
 ## Inline caching
8 takes advantage of another commonly used technique for optimizing dynamically typed languages called “inline caching”. An in-depth explanation of inline caches in Javascript can be found here, but in simple terms inline caching relies upon the observation that repeated calls to the same method tend to occur on the same type of object.

So how does it work? V8 maintains a cache of the type of objects that were passed as a parameter in recent method calls, and uses that information to make an assumption about the type of object that will be passed as a parameter in the future. If V8 is able to make a good assumption about the type of object that will be passed to a method, it can bypass the process of figuring out how to access the objects properties, and instead use the stored information from previous lookups to the objects hidden class.

So how are the concepts of hidden classes and inline caching related? Whenever a method is called on a specific object, the V8 engine has to perform a lookup to that objects hidden class to determine the offset for accessing a specific property. After two successful calls of the same method to the same hidden class, V8 omits the hidden class lookup and simply adds the offset of the property to the object pointer itself. For all future calls of that method, the V8 engine assumes that the hidden class hasn’t changed, and jumps directly into the memory address for a specific property using the offsets stored from previous lookups; this greatly increases execution speed.

Inline caching is also why its so important that objects of same type share hidden classes. If you create two objects of the same type, but with different hidden classes (as we did in the example earlier), V8 won’t be able to use inline caching because even though the two objects are of the same type, their corresponding hidden classes assign different offsets to their properties.