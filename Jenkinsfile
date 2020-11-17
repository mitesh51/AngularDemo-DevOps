pipeline {
	agent {
		kubernetes {
		  //label 'maven'  // all your pods will be named with this prefix, followed by a unique id
		  idleMinutes 5  // how long the pod will live after no jobs have run on it
		  yamlFile 'build-agent-pod.yaml'  // path to the pod definition relative to the root of our project 
		  defaultContainer 'node'  // define a default container if more than a few stages use it, will default to jnlp container
		}
	} 
	stages {
		stage('Static Code Analysis') {

			steps {
			    container('node') { 
                    echo "Steps to execute SCA"
			    }
			}
		}
		
		stage('UnitTests & Coverage') {
			steps {
        container('chrome') {
				  echo "Steps to execute Unit Tests"
          sh 'npm install && npm install karma-junit-reporter --save-dev && npm run test --progress false --watch false'
          junit 'TESTS-*.xml'
          publishCoverage(adapters: [coberturaAdapter('coverage/cobertura-coverage.xml')], sourceFileResolver: sourceFiles('NEVER_STORE'))
        }
       }		
		}

    
		stage('Build') {
			steps {
				echo "Steps to execute Build"
				sh 'npm run build'
				zip archive: true, dir: 'dist/Demo1', glob: '', zipFile: 'browser.zip'
			}
		}
		stage('Docker Image') {
			steps {
				echo "Steps to Build Docker Image"
			}
		}
 		stage('EKS-Deployment') {
			steps {
				echo "Steps to execute EKS Deployment"
			}
		}
	}
}
