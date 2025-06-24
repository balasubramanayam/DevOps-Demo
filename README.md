This is for direct deploy to docker
app path/ docker build -t backend .
app path/ docker build -t frontend .
docker compose path/ docker compose-up



1.cmd-->  

java -jar jenkins.war --httpPort=8084   //to start jenkin in another port num part from 8080 or 8084 

2.Googgle-->local :8084 

3.cmd--> copy password -- paste junkin 

4.install suggesting plugin  

5.getting started 

--- admin,password,confirm password,fullname,email --- save and continue  

6.Instance configuration ---->  Jenkins is ready! 

7.Welcome to jenkin page 

8.click manage jenkins 

9.install needed plugins 

Install-- docker pipeline ,docker API, SonarQube Scanner , spring rest api etc 
  

Springboot Project: 

create springboot project if needed Junit test case run test cases 

Create repo in gitgub 

 D: drive-->folder project-->gitbash-->git init-->git add . --> git status -->git commit -m "first commit" --> git status -->  
  

git remote add origin "....."  

git push -u origin master 

10.Create Freestyle project--> New Item --> All --> Click Freestyle --> First project --> Configure --> Source code management --> Git --> git repo url -->Build steps--> Excute window batch command--> "mvn install"--> apply and save. 

11.Build Now --> Console output --> Build Success !!! 

12.Configure --> Post Build Actions --> Publish Junit test results report -- Test reports --> xml -->" /target/surefire-reports/*.xml " 

13.Task --> Working with plugins --> Manage jenkins --> install plugins --TestComplte 

14.System --> SonarQube Servers --> SonarQube Instalation -->"MySonar" --> Server url "localhost:8080" --> Docker--> MyDocker --> url "localhost:2375" 

15.Create CICD Pipeline Project --> project created  

16.Pipeline --> PipeLine Script --> Script ? 

node {  

stage('1.Checkout the Project') {  

git 'https://github.com/balasubramanayam/JenkinsProject.git' // ---> Build the project } stage('2.Build the project') {  

bat'mvn clean install' // ---> Build the project }  

stage('3.Test the project') {  

bat 'mvn test' } } // ---> apply and save.  

17.Tools -->Add sonar jar link--> SonarQube --> Name "SonarQube" --> d:General path without bin --> SonarRunnar home --> Link "--" save . 

18.Now Open sonar qube --> create sonar project -->  

bat 'mvn clean verify sonar:sonar -Dsonar.projectKey=JenkinsProject -Dsonar.projectName='JenkinsProject' -Dsonar.host.url=http://localhost:9000 -Dsonar.token=sqp_85d8043fe87bca0e7c8f9f4d76bf1754a03972f6' 

--> goto 16. Add Mvn link into Pipeline script -->check groovy--> save --> build  

19.Create Docker file in Github and add FROM openjdk:17 WORKDIR /app COPY ${JAR_FILE} app.jar EXPOSE 8084 CMD ["java", "-jar", "JenkinsDemo-0.0.1-SNAPSHOT.jar"] 

---C:\Users\balasubramanyam.b.jenkins\workspace\Jenkin CICD Pipeline Project\target 

20.-->goto 16. Configure -- Add Stage - Dockerize --  

    stage('Dockerize') 
{ 
    bat 'docker image build -t cicdtestapp .' 
} 
  

apply and save -- Build  

manually build in springboot like if  

FROM openjdk:17 # Update this to openjdk:21 when available WORKDIR /app COPY target/SonarQubeDemo-0.0.1-SNAPSHOT.jar app.jar EXPOSE 8084 CMD ["java", "-jar", "app.jar"] 

docker build --build-arg JAR_FILE=target/SonarQubeDemo-0.0.1-SNAPSHOT.jar -t sonarqubedemo . or docker build -t sonarqubedemo . 

docker run -p 8084:8084 sonarqubedemo 

21.Maven install 22.Git push update ,pull 23.Sonar run , Jenkin run , 

24.---10th ---Again Run 

New Working Script: 

pipeline { 
agent any 
environment { 
JAVA_HOME = 'C:\Program Files\Java\jdk-21' 

 } stages { stage('1. Checkout the Project') { steps { git 'https://github.com/balasubramanayam/JenkinsDemo.git' } } stage('2. Build the project') { steps { bat 'mvn clean install' } } stage('3. SonarQube Analysis') { steps { bat 'mvn clean verify sonar:sonar -Dsonar.projectKey=SonarQubeDemo -Dsonar.projectName=SonarQubeDemo -Dsonar.host.url=http://localhost:9000 -Dsonar.token=sqp_4419b6fa111e9d939e2891a4eef28e3415c22847' } } stage('4. Build Docker Image') { steps { script { docker.build('sonarqubedemo') } } } stage('5. Run Docker Container') { steps { script { docker.image('sonarqubedemo').run('-p 8084:8084') } } } } } 

Full Stack script: pipeline { agent any environment { JAVA_HOME = 'C:\Program Files\Java\jdk-21' } stages { stage('1. Checkout the Project') { steps { git 'https://github.com/balasubramanayam/JenkinsFullStackSetUp.git' } } stage('2. Build Backend Project') { steps { dir('SonarQubeDemo') { bat 'mvn clean install' } } } stage('3. Build Frontend Project') { steps { dir('crudoperation') { bat 'npm install' } } } stage('4. SonarQube Analysis (Backend)') { steps { dir('SonarQubeDemo') { bat 'mvn clean verify sonar:sonar -Dsonar.projectKey=BackendSonarQube -Dsonar.projectName=BackendSonarQube -Dsonar.host.url=http://localhost:9000 -Dsonar.token=sqp_6963c7627be550e0d1d21e65ea08c6f0ea9816f0' } } } stage('5. SonarQube Analysis (Frontend)') { steps { dir('crudoperation') { bat 'D:\sonar-scanner-7.0.2.4839-windows-x64\bin\sonar-scanner.bat -D"sonar.projectKey=FrontendSonarQube" -D"sonar.sources=." -D"sonar.host.url=http://localhost:9000" -D"sonar.token=sqp_b1afcf1fcb556599fd843f91bc077c58d17e6023"' } } } stage('6. Build Backend Docker Image') { steps { script { docker.build('backend', './SonarQubeDemo') } } } stage('7. Build Frontend Docker Image') { steps { script { docker.build('frontend', './crudoperation') } } } stage('8. Docker Compose Up') { steps { bat 'docker-compose up -d' } } } } 

 

this is jenkins pipeline synatx

pipeline {
    agent any
    environment {
        JAVA_HOME = 'C:\\Program Files\\Java\\jdk-21'
    }
    stages {
        stage('1. Checkout the Project') {
            steps {
               git branch: 'master',
                    url: 'https://github.com/balasubramanayam/JenkinsFullStackSetUp.git'
            }
        }
        stage('2. Build Backend Project') {
            steps {
                dir('SpringbootCrud') {
                    bat 'mvn clean install'
                }
            }
        }
        stage('3. Build Frontend Project') {
            steps {
                dir('crudoperation') {
                    bat 'npm install'
                }
            }
        }
        stage('4. SonarQube Analysis (Backend)') {
            steps {
                dir('SpringbootCrud') {
                    bat 'mvn clean verify sonar:sonar -Dsonar.projectKey=BackendSonarQube -Dsonar.projectName=BackendSonarQube -Dsonar.host.url=http://localhost:9000 -Dsonar.token=sqp_6963c7627be550e0d1d21e65ea08c6f0ea9816f0'
                }
            }
        }
        stage('5. SonarQube Analysis (Frontend)') {
            steps {
                dir('crudoperation') {
                    bat 'D:\\sonar-scanner-7.0.2.4839-windows-x64\\bin\\sonar-scanner.bat -D"sonar.projectKey=FrontendSonarQube" -D"sonar.sources=." -D"sonar.host.url=http://localhost:9000" -D"sonar.token=sqp_b1afcf1fcb556599fd843f91bc077c58d17e6023"'
                }
            }
        }
        stage('6. Build Backend Docker Image') {
            steps {
                script {
                    docker.build('backend', './SpringbootCrud')
                }
            }
        }
        stage('7. Build Frontend Docker Image') {
            steps {
                script {
                    docker.build('frontend', './crudoperation')
                }
            }
        }
        stage('8. Docker Compose Up') {
            steps {
                bat 'docker-compose up -d'
            }
        }
    }
}

SonarQube: 

 

SonarQube is an open-source platform developed by Sonar Source for continuous inspection of code quality. 

Static and Dynamic code analysis tool to detect bugs, code smells, and security vulnerabilities across 20+ programming languages. 

SonarQube offers reports on duplicated code, coding standards, unit tests, code coverage, code complexity, comments, bugs, and security vulnerabilities. 

 

Set up: 

Step 1: 

In cmd : bin/windows/StartSonar.bat 

Run In Browser using: Localhost:9000 

Create the project and copy token: 

mvn clean verify sonar:sonar -Dsonar.projectKey=SonarQubeDemo -Dsonar.projectName='SonarQubeDemo' -Dsonar.host.url=http://localhost:9000 -Dsonar.token=sqp_35301ffabc03b823f734cc1503f2568ff074d0ad 

Backend Springboot: 

Step2: Add SonarQube dependency In Springboot Application Pom.xml 

<dependency> 

    <groupId>org.sonarsource.scanner.maven</groupId> 

    <artifactId>sonar-maven-plugin</artifactId> 

    <version>3.10.0.2594</version> 

</dependency> 

Build Clean Install Project 

Step 3: Select Build Application  

Add Generated token on Goals & remove mvn(Because we are building maven).  

Reload Page Localhost:9000 

Check duplicated code, coding standards, unit tests, code coverage, code complexity, comments, bugs, and security vulnerabilities. 

If all issues clear output: 

  

 

Another Way to Build without Dependency: 

Go to Project path D:/Project add here that generated token without removing mvn ... 

 

 

Frontend React JS: 

Note: Download Sonar Scanner - https://docs.sonarsource.com/sonarqube-server/9.6/analyzing-source-code/scanners/sonarscanner/ 

Step 1: npm install sonarqube-scanner@latest 

Step 2: 

Create sonar-scanner.js file: outside of Src folder. 

Add this code : 

const { default: sonarqubeScanner } = require('sonarqube-scanner'); 

sonarqubeScanner( { serverUrl: 'http://localhost:9000', // Your SonarQube server URL token: 'sqp_0007b52ead647021e5b5c23f6a94a12bef98f441', // Replace with your generated token options: { 'sonar.projectKey': 'FrontendSonarQube', // Unique key for your project 'sonar.projectName': 'FrontendSonarQube', // Display name 'sonar.sources': 'src', // Source code directory 'sonar.exclusions': 'src/**/*.test.js', // Exclude test files (optional) 'sonar.sourceEncoding': 'UTF-8', 'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info', // For test coverage (optional, see Step 5) }, }, () => { console.log('SonarQube analysis completed'); process.exit(); } ); 

Step 3: Update your package.json script if needed: 

"scripts": { 

  "sonar": "node sonar-scanner.js"  } 

Step 4: 

npm run sonar 

 

 

 

 

 

 


