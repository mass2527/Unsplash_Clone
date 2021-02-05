# **Unsplash Clone** <img src="https://global-uploads.webflow.com/5b0c471ddb589cf22d4477a4/5cd716028463a5a1d1b1e73d_unsplash-app-icon-2.png" width="30">

This is a clone project of [**Unsplash**](https://unsplash.com) made with ReactJS and Typescript.

Unfortunately, as [**unsplash demo api**](https://unsplash.com/oauth/applications) restricts the number of requests per hour, i decided not to deploy demo of this clone.

If you want to watch video click [**here**](https://www.linkedin.com/posts/dh-kim-733227200_reactjs-instagram-linkedin-activity-6759438400706764800-bNwH)

<br/>

## Index

[1. Why did i make](#Why-did-i-make)  
[3. Developement stack](#Developement-stack)  
[4. Detail](#Detail)  
[5. What did i learn](#What-did-i-learn)

<br/>

### **Why did i make**

- To improve reactjs skills
- To learn how to use typescript with reactjs
- To get familiar with using API


<br/>

### **Developement stack**

<br/>

<div>
<img src="https://www.acwebdev.tech/static/media/react-icon.52610ecf.png" width="100">
<img src="https://miro.medium.com/max/816/1*mn6bOs7s6Qbao15PMNRyOA.png" width="100">
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbdjy4HpplGW-RqVYTAB5dEZ18l4jdj07HcA&usqp=CAU" width="100">
</div>

<br/>
<br/>

### **Detail**

#### **Main page**

- `Shows all latest images of unsplash (infinite scrolling)`
- `Can watch photographers information by hovering`
- `Can search all images`

![main page](./thumbnail.jpg)

<br/>

![modal](src/readme/chrome_PzbQGseM3u.png)

<br/>

#### **Profile page**

- `Can watch all the posts that user has created and posts that user has liked.`
- `Can watch user's followings and follwers`
- `If you are owner of that account, you can edit profile image and introduction`

![profile page](src/readme/chrome_4aucYOEYsu.png)

<br/>

#### **DM page**

- `Can search user and start conversation in realtime`

![DM page](src/readme/chrome_2dGBqYMLRC.png)

<br/>

#### **Responsive**

- `Fully responsive layout for mobile user`

![responsive main](src/readme/chrome_9VMyuV31PM.png)
<br/>
<br/>
![responsive profile](src/readme/chrome_6afXqSTh3z.png)
<br/>
<br/>
![responsive dm](src/readme/chrome_qZ973cfUVY.png)
<br/>
<br/>

### **What did i learn**

`1. learned importance of organized folder structure, clear variable name.`

As the size of app grows, rewriting code is imperative since i need to fix my code whenever i found a bug.  
 In this kind of moment, organized folder structure and clear variable name make me easily find the file.

`2. learned importance of code refactoring.`

Found out my brain works better when i am watcing clean code.  
 However, when i was trying to write some code on messy code, my brain was fried and don't want to think anymore.  
 Since then, i did code refactoring as much as i can.

`3. learned importance of DB structure.`

As i need to store lots of data like message, user and post, it was really important to have well organized DB strutures so that i can easily read, update or delete it.


![Search](./search.gif)
![Search](./photographerInfo.gif)
![Image download](./download.gif)
![Related photos and Collections](./related.gif)
