## st-cp

[![Gitter](https://badges.gitter.im/springtype-official/springtype.svg)](https://gitter.im/springtype-official/springtype?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

![Node CI](https://github.com/springtype-org/st-cp/workflows/Node%20CI/badge.svg?branch=master)

> Cross-platform `cp`
  copy easy files folders in npm using npx `st-cp source destination`
  **create missing folders automatically**
>
##Parameter
###source 
 - required
 - multiple (files and folders)
###destination
 - required
 - enforce folder with / @ the end
 
 

##Examples:
####copy files to a folder
  ```
   # before
   ├── --- file1
   ├── --- file2
   ├── --- file3
  ```
`st-cp file1 file2 file3 folder`  
  ```
   # after
   ├── --- file1
   ├── --- file2
   ├── --- file3
   ├── --- folder/file1
   ├── --- folder/file2
   ├── --- folder/file3
  ```  
####copy file to a folder
  ```
   # before
   ├── --- file
  ```
`st-cp file folder/`  
  ```
   # after
   ├── --- file
   ├── --- folder/file
  ```  
####copy file to a file (create a folder)
  ```
   # before
   ├── --- file
  ```
`st-cp file folder/new-file`  
  ```
   # after
   ├── --- file
   ├── --- folder/new-file
  ```  
####copy folder to folder
  ```
   # before
   ├── --- folder
  ```
`st-cp folder folder1`  
  ```
   # after
   ├── --- folder
   ├── --- folder1
  ```  
####copy files and folders to destination
  ```
   # before
   ├── --- file1
   ├── --- file2
   ├── --- folder1
   ├── --- folder2
  ```
`st-cp file folder dist`  
  ```
   # after
   ├── --- file1
   ├── --- file2
   ├── --- folder1
   ├── --- folder2
   ├── --- dist/file1
   ├── --- dist/file2
   ├── --- dist/folder1
   ├── --- dist/folder2
  ```  


###Exceptional:
copy file to existing folder
  ```
   # before
   ├── --- file
   ├── --- folder
  ```
`st-cp file folder`  
  ```
   # after
   ├── --- file
   ├── --- folder
   ├── --- folder/file
  ```  

<h2 align="center">Backers</h2>

Thank you so much for supporting us financially! 🙏🏻😎🥳👍

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars2.githubusercontent.com/u/17221813?v=4&s=150">
        </br>
        <a href="https://github.com/jsdevtom">Tom</a>
      </td>
    </tr>
  <tbody>
</table>

<h2 align="center">Maintainers</h2>

SpringType is brought to you by:

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/454817?v=4&s=150">
        </br>
        <a href="https://github.com/kyr0">Aron Homberg</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars2.githubusercontent.com/u/12079044?s=150&v=4">
        </br>
        <a href="https://github.com/mansi1">Michael Mannseicher</a>
      </td>
    </tr>
  <tbody>
</table>

<h2 align="center">Contributing</h2>

Please help out to make this project even better and see your name added to the list of our
[CONTRIBUTORS.md](./CONTRIBUTORS.md) :tada:
