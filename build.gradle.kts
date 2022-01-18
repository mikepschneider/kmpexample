plugins {
    kotlin("multiplatform") version "1.6.0"
    id("com.chromaticnoise.multiplatform-swiftpackage") version "2.0.3"

//    id("net.akehurst.kotlin.kt2ts") version("1.6.0")
}

group = "me.mikschn"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

kotlin.targets.withType(org.jetbrains.kotlin.gradle.plugin.mpp.KotlinNativeTarget::class.java) {
    binaries.all {
        binaryOptions["memoryModel"] = "experimental"
    }
}

kotlin {
    jvm {
        withJava()
    }
    js(LEGACY) {
        browser {
            webpackTask {
                output.libraryTarget = "commonjs2"
            }
            commonWebpackConfig {
                cssSupport.enabled = true
            }
        }
        binaries.executable()
    }
    val hostOs = System.getProperty("os.name")
    val isMingwX64 = hostOs.startsWith("Windows")

    iosArm32("nativeArm32") {
        binaries {
            framework {
                baseName = "KMPExample"
            }
        }
    }
    iosArm64("nativeArm64") {
        binaries {
            framework {
                baseName = "KMPExample"
            }
        }
    }
    iosX64("nativeX64") {
        binaries {
            framework {
                baseName = "KMPExample"
            }
        }
    }

    multiplatformSwiftPackage {
        packageName("KMPExample")
        swiftToolsVersion("5.3")
        targetPlatforms {
            iOS { v("13") }
        }
        outputDirectory(File(rootDir, "/"))
    }
    sourceSets {
        commonMain {
            dependencies {
                implementation("org.jetbrains.kotlin:kotlin-reflect:1.6.0")
                implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.6.0-native-mt")
                implementation("com.benasher44:uuid:0.3.1")
                implementation("org.jetbrains.kotlinx:kotlinx-datetime:0.3.1")
            }
        }

        val jvmTest by getting {
            dependencies {
                implementation("junit:junit:4.13.2")
                implementation("org.jetbrains.kotlin:kotlin-test:1.6.0")
                implementation("org.jetbrains.kotlinx:kotlinx-coroutines-test:1.6.0-native-mt")
                implementation("org.mockito:mockito-core:4.1.0")
                implementation ("io.kotlintest:kotlintest-runner-junit5:3.3.2")
                implementation ("org.jetbrains.kotlin:kotlin-reflect:1.6.0")
                runtimeOnly    ("org.junit.jupiter:junit-jupiter-engine:5.5.2")
                implementation ("org.junit.jupiter:junit-jupiter-api:5.5.2")
                implementation ("org.junit.jupiter:junit-jupiter-params:5.5.2")
            }
        }
        val jsMain by getting
    }
}

