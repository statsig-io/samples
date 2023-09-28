package com.statsig.todo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.statsig.sdk.Statsig;

import javax.net.ssl.*;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
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
	public static void main(String[] args) throws ExecutionException, InterruptedException {
		SpringApplication.run(TodoApplication.class, args);
		disableCertificateVerification();
		TodoApplication todoApplication = new TodoApplication();
		todoApplication.initializeStatsig();


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


}
