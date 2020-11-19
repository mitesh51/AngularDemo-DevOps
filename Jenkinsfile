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
                    sh 'wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-3.3.0.1492-linux.zip'
                    sh 'unzip sonar-scanner-cli-3.3.0.1492-linux.zip'
    				withSonarQubeEnv(installationName: 'SonarQube', credentialsId: 'SonarToken') {
    				  sh 'ls -l'
    				  sh 'sonar-scanner-3.3.0.1492-linux/bin/sonar-scanner -Dsonar.projectVersion=1.0 -Dsonar.projectKey=sample-angular-app -Dsonar.sources=src'
    				}
				    waitForQualityGate(abortPipeline: true, credentialsId: 'SonarToken')
			    }
			}
		}
		stage('UnitTests & Coverage') {
			steps {
				container('chrome') {
					echo "Steps to execute Unit Tests"
					catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
						sh 'npm install && npm install karma-junit-reporter --save-dev && npm run test --progress false --watch false'
					}
				}
			}		
		}
		stage('Build') {
			steps {
				echo "Steps to execute Build"
				sh 'npm run build'
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
					sh 'docker image build -t mitesh51/angular-demo:0.2 .'
					withCredentials([usernamePassword(credentialsId: 'docker-login', passwordVariable: 'password', usernameVariable: 'uname')]) {
					    sh 'docker login -u=$uname -p=$password'
                    }
					sh 'docker push mitesh51/angular-demo:0.1'
				}
		
			}
		}		
		stage('anchore') {
			steps {
                anchore bailOnFail: false, bailOnPluginFail: false, name: 'anchore_images'
			}
		}
 		stage('EKS-Deployment') {
			steps {
				echo "Steps to execute EKS Deployment"
        kubernetesDeploy configs: 'eks-deployment.yaml', kubeConfig: [path: ''], kubeconfigId: 'eks-kubeconfig', secretName: '', ssh: [sshCredentialsId: '*', sshServer: ''], textCredentials: [certificateAuthorityData: '', clientCertificateData: '', clientKeyData: '', serverUrl: 'https://']
			}
		}
	}

	post {
		always{
			junit 'TESTS-*.xml'
			publishCoverage adapters: [coberturaAdapter(path: 'coverage/Demo1/cobertura-coverage.xml', thresholds: [[failUnhealthy: true, thresholdTarget: 'Line', unhealthyThreshold: 30.0, unstableThreshold: 60.0]])], failNoReports: true, failUnhealthy: true, failUnstable: true, sourceFileResolver: sourceFiles('NEVER_STORE')
		}
	}
}
