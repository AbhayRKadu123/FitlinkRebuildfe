
import React from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet,
} from 'react-native';

import { Ionicons } from '@react-native-vector-icons/ionicons';


const ActionPopup = ({
    visible,
    onClose,
    title = 'Options',
    subtitle = 'Choose an action',
    options = [],
}) => {

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>

                    <TouchableWithoutFeedback>
                        <View style={styles.popup}>

                            {/* Header */}
                            <View style={styles.header}>
                                <View>
                                    <Text style={styles.title}>
                                        {title}
                                    </Text>

                                    <Text style={styles.subtitle}>
                                        {subtitle}
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    onPress={onClose}
                                    style={styles.closeBtn}
                                >
                                    <Ionicons
                                        name="close"
                                        size={23}
                                        color="#555"
                                    />
                                </TouchableOpacity>
                            </View>

                            {/* Actions */}
                            <View style={styles.optionsContainer}>
                                {options.map((item, index) => (
                                    <TouchableOpacity
                                        key={item.id || index}
                                        style={styles.option}
                                        onPress={() => {
                                            onClose();
                                            item.onPress?.();
                                        }}
                                    >
                                        <View style={[
                                            styles.iconContainer,
                                            {
                                                backgroundColor:
                                                    item.backgroundColor || '#F1F5F9'
                                            }
                                        ]}>
                                            <Ionicons
                                                name={item.icon}
                                                size={21}
                                                color={item.color || '#333'}
                                            />
                                        </View>

                                        <Text style={[
                                            styles.optionText,
                                            { color: item.color || '#222' }
                                        ]}>
                                            {item.label}
                                        </Text>

                                        <Ionicons
                                            name="chevron-forward"
                                            size={18}
                                            color="#A0A0A0"
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>

                            {/* Cancel */}
                            <TouchableOpacity
                                style={styles.cancelBtn}
                                onPress={onClose}
                            >
                                <Text style={styles.cancelText}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </TouchableWithoutFeedback>

                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default ActionPopup;

const styles = StyleSheet.create({

    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.55)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 25,
    },

    popup: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        elevation: 15,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },

    title: {
        fontSize: 19,
        fontWeight: '700',
        color: '#171717',
    },

    subtitle: {
        fontSize: 13,
        color: '#888',
        marginTop: 5,
    },

    closeBtn: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: '#F2F2F2',
        alignItems: 'center',
        justifyContent: 'center',
    },

    optionsContainer: {
        gap: 8,
    },

    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 12,
    },

    iconContainer: {
        width: 42,
        height: 42,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 13,
    },

    optionText: {
        flex: 1,
        fontSize: 15,
        fontWeight: '600',
    },

    cancelBtn: {
        marginTop: 15,
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        padding: 14,
        alignItems: 'center',
    },

    cancelText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#444',
    },

});
