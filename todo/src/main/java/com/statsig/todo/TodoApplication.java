package com.statsig.todo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.statsig.sdk.Statsig;

import javax.net.ssl.*;
import java.security.GeneralSecurityException;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;


@SpringBootApplication
public class TodoApplication {

	@Value("${statsig.server.key}")
	private String SERVER_KEY;

	/**
	 *
	 * @param args
	 * @throws ExecutionException
	 * @throws InterruptedException
	 */
	public static void main(String[] args) throws Exception {
		SpringApplication.run(TodoApplication.class, args);
//		disableCertificateVerification();
//		disableCertificateValidation();
//		disable4();
//
//
//
//
//		TodoApplication todoApplication = new TodoApplication();
//		todoApplication.initializeStatsig();


	}

	private void initializeStatsig() throws ExecutionException, InterruptedException{
		System.out.println("SERVER KEY IS: "+SERVER_KEY);
		Future initFuture = Statsig.initializeAsync("secret-F4JPRCLoZVaYNwzQRE1FmqcC124QRuw7ZyxjdAEx7Hv");
		initFuture.get();
	}

	/**
	 * To disable certificate verification
	 * For error: {javax.net.ssl.SSLHandshakeException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException:
	 *  unable to find valid certification path to requested target}
	 *
	 */
	private static void disableCertificateVerification() {
		TrustManager[] trustAllCerts = new TrustManager[] { new X509TrustManager() {
			public java.security.cert.X509Certificate[] getAcceptedIssuers() {
				return null;
			}

			@Override
			public void checkClientTrusted(java.security.cert.X509Certificate[] arg0, String arg1)                  throws CertificateException {
			}

			@Override
			public void checkServerTrusted(java.security.cert.X509Certificate[] arg0, String arg1)
					throws CertificateException {
			}
		} };

		try {
			SSLContext sslContext = SSLContext.getInstance("SSL");
			sslContext.init(null, trustAllCerts, new java.security.SecureRandom());
			HttpsURLConnection.setDefaultSSLSocketFactory(sslContext.getSocketFactory());
			HttpsURLConnection.setDefaultHostnameVerifier(new HostnameVerifier() {
				@Override
				public boolean verify(String s, SSLSession sslSession) {
					return true;
				}
			});

		} catch (NoSuchAlgorithmException | KeyManagementException e) {

		}
	}


	private static void disableSSLCheck2(){
		try {
			SSLContext sslContext = SSLContext.getInstance("TLS");
			sslContext.init(null, new TrustManager[]{new X509TrustManager() {
				public void checkClientTrusted(java.security.cert.X509Certificate[] arg0, String arg1) throws CertificateException {}
				public void checkServerTrusted(java.security.cert.X509Certificate[] arg0, String arg1) throws CertificateException {}
				public java.security.cert.X509Certificate[] getAcceptedIssuers() { return new java.security.cert.X509Certificate[0]; }
			}}, new java.security.SecureRandom());
			HttpsURLConnection.setDefaultSSLSocketFactory(sslContext.getSocketFactory());
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	private static void disableCertificateValidation() throws Exception {
		// Create a trust manager that trusts all certificates
		TrustManager[] trustAllCertificates = new TrustManager[]{
				new X509TrustManager() {
					public X509Certificate[] getAcceptedIssuers() {
						return null;
					}
					public void checkClientTrusted(X509Certificate[] certs, String authType) {
					}
					public void checkServerTrusted(X509Certificate[] certs, String authType) {
					}
				}
		};

		// Set up an SSL context with the trust manager that trusts all certificates
		SSLContext sslContext = SSLContext.getInstance("TLS");
		sslContext.init(null, trustAllCertificates, new java.security.SecureRandom());

		// Set the default SSL socket factory to use the SSL context with the trust manager
		HttpsURLConnection.setDefaultSSLSocketFactory(sslContext.getSocketFactory());
		HttpsURLConnection.setDefaultHostnameVerifier((hostname,session) -> true);
	}

	private static void disable4(){
		TrustManager[] trustAllCerts = new TrustManager[] {
				new X509TrustManager() {
					public java.security.cert.X509Certificate[] getAcceptedIssuers() {
						return new X509Certificate[0];
					}
					public void checkClientTrusted(
							java.security.cert.X509Certificate[] certs, String authType) {
					}
					public void checkServerTrusted(
							java.security.cert.X509Certificate[] certs, String authType) {
					}
				}
		};

// Install the all-trusting trust manager
		try {
			SSLContext sc = SSLContext.getInstance("SSL");
			sc.init(null, trustAllCerts, new java.security.SecureRandom());
			HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());
		} catch (GeneralSecurityException e) {
		}

	}



}
