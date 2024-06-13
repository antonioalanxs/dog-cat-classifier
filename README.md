# dog-cat-classifier

## Table of Contents
1. [Overview](#overview)
2. [Demonstration](#demonstration)
3. [What have I learned?](#what-have-i-learned)

## Overview

This project focuses on creating a dog and cat classifier using [TensorFlow's cats_vs_dogs dataset](https://www.tensorflow.org/datasets/catalog/cats_vs_dogs?hl=es-419). We utilized [data augmentation techniques](https://www.google.com/search?q=data+augmentation&oq=data+augmentation&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDI5NzVqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8) to enhance model performance and robustness. Key steps include:

- Preparing and preprocessing the [cats_vs_dogs dataset](https://www.tensorflow.org/datasets/catalog/cats_vs_dogs?hl=es-419) for training neural networks.

- Training multiple neural network models with varying configurations and evaluating their performance using [Tensorboard](https://www.tensorflow.org/tensorboard?hl=es-419).

- Deploying the selected model using [TensorFlow.js](https://www.tensorflow.org/js?hl=es-419) for integration into a web application.

- Evaluating real-time performance on mobile devices to ensure practical usability.

The final chosen model features a [Convolutional neural network](https://en.wikipedia.org/wiki/Convolutional_neural_network) with three layers of convolutions (32, 64, and 128 filters respectively), followed by a dense layer of 100 neurons. The [Sigmoid activation function](https://en.wikipedia.org/wiki/Sigmoid_function) is employed for the output layer.

## Demonstration

<p align="center">
    <img src="./README-files/Cristina - cat.jpg" width="250" alt="Demonstration image 1" />
    <img src="./README-files/Guillermo - dog.jpg" width="250" alt="Demonstration image 2" />
</p>

<p align="center"><i>My beloved pets, Cristina (the cat) and Guillermo (the dog), were my inspiration for this project.</i></p>

> https://dog-cat-classifier-six.vercel.app/

## What have I learned?

- Data preprocessing for machine learning models.

- Basic usage of [Matplotlib](https://matplotlib.org/) for data visualization.

- Training [Convolutional neural networks (CNNs)](https://en.wikipedia.org/wiki/Convolutional_neural_network) for image classification, including understanding [activation functions](https://aiofthings.telefonicatech.com/recursos/datapedia/funcion-activacion) and selecting appropriate network architectures.

- Hyperparameter tuning and model evaluation using [Tensorboard](https://www.tensorflow.org/tensorboard?hl=es-419).

- Deployment of machine learning models using [TensorFlow.js](https://www.tensorflow.org/js?hl=es-419).

- Real-time inference and performance evaluation on mobile devices.

