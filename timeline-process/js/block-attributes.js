/**
 * Timeline Process - Ajout de l'attribut data-timeline-step aux blocs Kadence
 */
(function() {
    const { createHigherOrderComponent } = wp.compose;
    const { Fragment } = wp.element;
    const { InspectorControls } = wp.blockEditor;
    const { PanelBody, SelectControl } = wp.components;
    const { addFilter } = wp.hooks;
    
    // Liste des blocs Kadence auxquels ajouter l'attribut
    const allowedBlocks = [
        'kadence/rowlayout',
        'kadence/column',
        'kadence/infobox',
        'kadence/tabs',
        'kadence/accordion',
        'core/paragraph',
        'core/heading',
        'core/group'
    ];
    
    // Ajouter l'attribut aux blocs
    const addTimelineStepAttribute = (settings, name) => {
        if (!allowedBlocks.includes(name)) {
            return settings;
        }
        
        // Utiliser les attributs existants ou créer un nouvel objet
        settings.attributes = {
            ...settings.attributes,
            timelineStep: {
                type: 'string',
                default: '',
            },
        };
        
        return settings;
    };
    
    // Ajouter le contrôle dans l'inspecteur
    const withTimelineStepControl = createHigherOrderComponent((BlockEdit) => {
        return (props) => {
            // Vérifier si c'est un bloc autorisé
            if (!allowedBlocks.includes(props.name)) {
                return <BlockEdit {...props} />;
            }
            
            const { attributes, setAttributes } = props;
            const { timelineStep } = attributes;
            
            // Options pour le sélecteur
            const stepOptions = [
                { value: '', label: 'Aucune étape' },
                { value: '1', label: 'Étape 1' },
                { value: '2', label: 'Étape 2' },
                { value: '3', label: 'Étape 3' },
                { value: '4', label: 'Étape 4' },
                { value: '5', label: 'Étape 5' },
            ];
            
            return (
                <Fragment>
                    <BlockEdit {...props} />
                    <InspectorControls>
                        <PanelBody title="Timeline Process" initialOpen={false}>
                            <SelectControl
                                label="Étape de la timeline"
                                value={timelineStep}
                                options={stepOptions}
                                onChange={(value) => setAttributes({ timelineStep: value })}
                                help="Associer ce bloc à une étape de la timeline"
                            />
                        </PanelBody>
                    </InspectorControls>
                </Fragment>
            );
        };
    }, 'withTimelineStepControl');
    
    // Ajouter l'attribut data-timeline-step au HTML du bloc
    const addTimelineStepDataAttribute = (extraProps, blockType, attributes) => {
        if (!allowedBlocks.includes(blockType.name)) {
            return extraProps;
        }
        
        if (attributes.timelineStep) {
            extraProps['data-timeline-step'] = attributes.timelineStep;
        }
        
        return extraProps;
    };
    
    // Enregistrer les filtres
    addFilter(
        'blocks.registerBlockType',
        'timeline-process/add-timeline-step-attribute',
        addTimelineStepAttribute
    );
    
    addFilter(
        'editor.BlockEdit',
        'timeline-process/with-timeline-step-control',
        withTimelineStepControl
    );
    
    addFilter(
        'blocks.getSaveContent.extraProps',
        'timeline-process/add-timeline-step-data-attribute',
        addTimelineStepDataAttribute
    );
})();
