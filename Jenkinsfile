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
			   sudo ng build 
//			   sudo ng serve
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
         ls
			   npm install 
			   sudo ng build 
         ls
//			   sudo ng serve
			"""
        }
	}
  }
}
