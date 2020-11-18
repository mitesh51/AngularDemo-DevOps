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
		stage('Build') {
			steps {
				echo "Steps to execute Build"
				sh 'npm install && npm run build'
				zip archive: true, dir: 'dist/Demo1', glob: '', zipFile: 'browser.zip'
				stash(includes: 'browser.zip', name: 'dist')
			}
		}
		stage('Docker Image') {
			steps {
				
			
				container('docker') { 
				    echo "Steps to Build Docker Image"
            		unstash 'dist'
                    sh 'chmod 755 browser.zip'	
                    unzip(dir: 'dist/browser', zipFile: 'browser.zip')
					sh 'docker image build -t mitesh51/angular-demo:0.1 .'
					withCredentials([usernamePassword(credentialsId: 'docker-login', passwordVariable: 'password', usernameVariable: 'uname')]) {
					    sh 'docker login -u=$uname -p=$password'
                    }
					sh 'docker push mitesh51/angular-demo:0.1'
				}
		
			}
		}
 		stage('EKS-Deployment') {
			steps {
				echo "Steps to execute EKS Deployment"
			}
		}
	}


}
