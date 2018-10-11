pipeline {
  agent any
      
  stages {  
    stage('Clone') 
	{
      steps 
	  {
        checkout scm
      }
    }
    stage('Develop') 
	{
		when 
		{
			anyOf 
			{
			branch 'develop';
			}
		}
		steps 
		{
		    sh """
			   npm install 
			   sudo ng build --prod --env=dev
			   scp -r ./dist/ user@your.server.example.com:/var/www/html/
			"""
        }
	}
	stage('staging') 
	{
		when 
		{
			anyOf 
			{
			branch 'staging';
			}
		}
		steps 
		{
		    sh """
			   npm install 
			   sudo ng build --prod --env=
			   scp -r ./dist/ user@your.server.example.com:/var/www/html/
			"""
        }
	}
	stage('QA') 
	{
		when 
		{
			anyOf 
			{
			branch 'qa';
			}
		}
		steps 
		{
		    sh """
			   npm install 
			   sudo ng build --prod --env=qa
			   scp -r ./dist/ user@your.server.example.com:/var/www/html/
			"""
        }
	}
	stage('Release') 
	{
		when 
		{
			anyOf 
			{
			branch 'master';
			}
		}
		steps 
		{
		    sh """
			   npm install 
			   sudo ng build --prod --env=prod
			   scp -r ./dist/ user@your.server.example.com:/var/www/html/
			"""
        }
	}
  }
}
