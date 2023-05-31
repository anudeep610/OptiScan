from flask import Flask, request, jsonify
app = Flask(__name__)

import pandas as pd 
import numpy as np
from keras.models import load_model
import tensorflow as tf
import cv2
from keras.preprocessing.image import ImageDataGenerator

file_path = 'D:/major-project/backend/trained_models/'


imageSize=224
image_details_data=pd.read_csv('D:/major-project/backend/upload/image.csv') 
images_directory='D:/major-project/backend/upload' 

images=image_details_data['image']
predict_images=pd.DataFrame(images,columns=['image'])
select_data=predict_images.iloc[0]
select_img=list(select_data)

def generate_image_datagenerator(select_img):
    predict_images1=pd.DataFrame(select_img,columns=['image'])
    predict_images1['result']='to predict'
    predict_data_gen=ImageDataGenerator(rescale=1./255.)
    predicting_generator=predict_data_gen.flow_from_dataframe(
    dataframe=predict_images1,
    directory=images_directory,
    x_col="image",
    y_col="result",
    batch_size=32,
    seed=42,
    shuffle=False,
    class_mode="categorical",
    target_size=(224,224))
    return predicting_generator


def check_for_disease(user_selected_choice):
        predicting_generator=generate_image_datagenerator(select_img)
        predPerc = 0
        if(user_selected_choice==1): ##cataract detection
            cataract_model=load_model(file_path + 'cataract1.hdf5')
            pred1 = cataract_model.predict_generator(predicting_generator)
            predicted_class_idx1=np.argmax(pred1,axis=1)  ##0 for cataract
            predPerc = pred1[0][predicted_class_idx1]

            # input_image_path = 'D:/major-project/backend/upload/iris.jpg'
            # input_image = tf.keras.preprocessing.image.load_img(input_image_path, target_size=(224, 224))
            # input_array = tf.keras.preprocessing.image.img_to_array(input_image)
            # expanded_array = np.expand_dims(input_array, axis=0)
            # preprocessed_input = tf.keras.applications.vgg19.preprocess_input(expanded_array)

            # # Perform gradient-based class activation mapping (CAM)
            # last_conv_layer = cataract_model.get_layer('block5_conv3')
            # grad_model = tf.keras.models.Model([cataract_model.inputs], [last_conv_layer.output,cataract_model.output])
            # with tf.GradientTape() as tape:
            #     conv_outputs, predictions = grad_model(preprocessed_input)
            #     loss = predictions.numpy()
            # loss_value = loss[0,0]
            # grads = tape.gradient(loss, conv_outputs)[0]
            # # pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))
            # # heatmap = tf.reduce_mean(tf.multiply(pooled_grads, conv_outputs), axis=-1)
            # # heatmap = np.maximum(heatmap, 0)
            # # heatmap /= np.max(heatmap)

            # # # Resize the heatmap to match the input image size
            # # heatmap_resized = cv2.resize(heatmap, (input_image.width, input_image.height))

            # # # Apply the heatmap overlay
            # # image = cv2.imread(input_image_path)
            # # heatmap_overlay = cv2.applyColorMap(np.uint8(255 * heatmap_resized), cv2.COLORMAP_JET)
            # # output_image = cv2.addWeighted(image, 0.6, heatmap_overlay, 0.4, 0)

            # # # Save the output image with the heatmap overlay
            # # output_image_path = 'D:/major-project/backend/upload/heatmap.jpg'
            # # cv2.imwrite(output_image_path, output_image)

        elif(user_selected_choice==2): ##myopia detection
            myopia_model=load_model(file_path + 'Myopia.hdf5')
            pred1 = myopia_model.predict_generator(predicting_generator)
            predicted_class_idx1=np.argmax(pred1,axis=1)  ##0 for myopia
            predPerc = pred1[0][predicted_class_idx1]
            

        elif(user_selected_choice==3):  ##hypertension detection
            hyp_gla_model=load_model(file_path + 'Hyp_Gla.hdf5')
            pred1 = hyp_gla_model.predict_generator(predicting_generator)
            predicted_class_idx1=np.argmax(pred1,axis=1) ##1 for hypertension
            predPerc = pred1[0][predicted_class_idx1]
            
        
        elif(user_selected_choice==4):##glaucoma detection
            hyp_gla_model=load_model(file_path + 'Hyp_Gla.hdf5')
            pred1 = hyp_gla_model.predict_generator(predicting_generator)
            predicted_class_idx1=np.argmax(pred1,axis=1)  ##0 for glaucoma
            predPerc = pred1[0][predicted_class_idx1]
            

        elif(user_selected_choice==5):  ##retinoblastoma detection
            retinoblastoma_model=load_model(file_path + 'retinoblastoma2_time.hdf5')
            pred1 = retinoblastoma_model.predict_generator(predicting_generator)
            predicted_class_idx1=np.argmax(pred1,axis=1)  ##1 for retinoblastoma
            predPerc = pred1[0][predicted_class_idx1]
            

        elif(user_selected_choice==6):  ##normal
            normal_model=load_model(file_path + 'Normal.hdf5')
            pred1 = normal_model.predict_generator(predicting_generator)
            predicted_class_idx1=np.argmax(pred1,axis=1) ##0 for normal
            predPerc = pred1[0][predicted_class_idx1]

        return (predicted_class_idx1[0], predPerc)

@app.route('/check_disease', methods=['POST'])
def check_disease():
    print(request.json)
    user_selected_choice = int(request.json['user_selected_choice'])
    result = check_for_disease(user_selected_choice)
    predicted_class_idx, percentage = result[0], result[1][0]
    return jsonify({'predicted_class_idx': str(predicted_class_idx), 'percentage':str(percentage)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)