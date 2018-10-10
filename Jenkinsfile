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
			   npm install --no-color
			   ng build --no-color
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
			   npm install --no-color
			   ng build --no-color
			"""
        }
	}
  }
}
