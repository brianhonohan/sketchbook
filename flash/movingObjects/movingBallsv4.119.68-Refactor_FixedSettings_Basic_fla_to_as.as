��ࡱ�>��	����a�������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������Root Entry����������������������������������������������������Root Entry��������p�|Y�r��RASHt�5�B�@�Contents	�����9DPage 1�������������Symbol 56������������
�������������	
����" !#3$%&'()*+,-./0124E56789:;<=>?@ABCDF�G\IJKLMNOP����RSTUVWXYZ[����]^_`�����cdefghijklmnopqrstuvwxyz{|}~Symbol 55�����Symbol 54�������������WSymbol 53�����JSymbol 51��������������Symbol 508������Symbol 1�������������ASymbol 2�����~Symbol 3������������ڃSymbol 4�����|Symbol 5�������������_Symbol 6
������9Symbol 7��������������OSymbol 8����bASymbol 9��������������Symbol 10�����Symbol 11�������������RSymbol 12������Symbol 13�������������PSymbol 14&�����TSymbol 15������������Q@Symbol 16����H_Symbol 17�������������TSymbol 18����}TSymbol 19������������r�Symbol 20����lTSymbol 21������������a�Symbol 22"����[WSymbol 23������������P�Symbol 24!����E�Symbol 25������������:�Symbol 26 $����/�Symbol 27������������$�Symbol 28#%�����Symbol 29�������������Symbol 30.�����Symbol 31�������������@Symbol 32')�����
Symbol 33������������˚Symbol 34(,�����Symbol 35�������������)Symbol 36+-�����%Symbol 37�������������)Symbol 38*6�����&Symbol 39��������������Symbol 40/1�����TSymbol 41������������x$Symbol 4204����s?Symbol 43������������ixSymbol 4435����^�Symbol 45������������XBSymbol 462����E�Symbol 47������������>�Symbol 4879�����Symbol 49�����������������������������������������	
 !"#$%&'()*+,-./0123456789:;<=����?@ABCD����FGHIJKLMNOPQRSTUVW����YZ[\]����_`abcdefgh����jklmnopqr����tuvw����yz{|}~����CPicText	/���d����8Arial��"(EnvironmentManager���?���k1function getCurrentEnv()
{
	return _currEnv;
}
getCurrEnv()����O�������?��;2��function traceLoggingSettings()
{
	trace("......Logging Settings: ");
		
	trace("   _eMenuControls:     " + _eMenuControls + ", is enabled: " + isAreaEnabled(_eMenuControls) );
	trace("   _eLoadOrder:        " + _eLoadOrder + ", is enabled: " + isAreaEnabled(_eLoadOrder) );
	trace("   _eInitialization:   " + _eInitialization + ", is enabled: " + isAreaEnabled(_eInitialization) );
	trace("   _eSystemGeneration: " + _eSystemGeneration + ", is enabled: " + isAreaEnabled(_eSystemGeneration) );
	
	trace("   _eCollisionEvent:   " + _eCollisionEvent + ", is enabled: " + isAreaEnabled(_eCollisionEvent) );
	trace("   _eCoreFunctions:    " + _eCoreFunctions + ", is enabled: " + isAreaEnabled(_eCoreFunctions) );
	trace("   _eViewer:           " + _eViewer + ", is enabled: " + isAreaEnabled(_eViewer) );
	trace("   _eLayout:           " + _eLayout + ", is enabled: " + isAreaEnabled(_eLayout) );
	trace("   _eZooming:          " + _eZooming + ", is enabled: " + isAreaEnabled(_eZooming) );
}
traceLoggingSettings();
traceLoggingSettings�����OO���CPicText	����d���*8
Arial��"(LogManager���?��"��function logMessage (p_message, p_funcArea, p_AltFuncArea1, p_AltFuncArea2)
{

	bDebugFuncArea	= false;
	bValidArea 		= true;


	//trace ("Log Message Called.");
	if ( false == bDebugFuncArea)
	{
		//trace ("...Testing Area: " + p_funcArea);
		bValidArea 		= isValid(p_funcArea);
		if( bValidArea )
			bDebugFuncArea = isAreaEnabled( p_funcArea);
		//trace (".....areaEnabled?: " + bDebugFuncArea);
	}
	
	if ( false == bDebugFuncArea)
	{
		//trace ("...Testing Area: " + p_AltFuncArea1);
		bValidArea 		= isValid(p_AltFuncArea1);
		if( bValidArea )
			bDebugFuncArea = isAreaEnabled( p_AltFuncArea1);
		//trace (".....areaEnabled?: " + bDebugFuncArea);
	}

	if ( false == bDebugFuncArea)
	{
		//trace ("...Testing Area: " + p_AltFuncArea2);
		bValidArea 		= isValid(p_AltFuncArea2);
		if( bValidArea )
			bDebugFuncArea = isAreaEnabled( p_AltFuncArea2);
		//trace (".....areaEnabled?: " + bDebugFuncArea);
	}


	if (bDebugFuncArea)
	{	
		trace ( p_message );
	}else
	{
		if ( m_bWarnOnFilteredMsg)
		{
			trace ("Warning, message filtered out.  FunctionAreas: "
					 + p_funcArea + ", " + p_AltFuncArea1 + ", " + p_AltFuncArea2 );
		}
	}
}

function isAreaEnabled(p_funcArea)
{
	if ( 0 == enabledFuncAreas.length)
		return false;     			// NO areas enabled	

	for (i=0; i< enabledFuncAreas.length; i++)
	{
		_tempEnabledArea = enabledFuncAreas[i];
		if( p_funcArea == _tempEnabledArea)
			return true;
	}
	//trace("...Tracing disabled for Area: " + p_funcArea);
	return false;
}

function isValid ( p_functionArea)
{
	//trace ("...Testing if Area is valid: " + p_functionArea);

	bIsValid = true;
	if (p_functionArea == null || p_functionArea > _eMaxArea || p_functionArea < _eMinArea)  
	{
		bIsValid = false;
		//trace ("...Invalid Logging Area. Specified: " + p_funcArea);
	}
	//trace ("......area found to be valid?: " + bIsValid);
	return bIsValid;
}
logMessage()����O������
CPicSprite
�%�
M��E_bg�����>A�0�00���?���W
Layer 1����O������
CPicSprite
����*�	_plusSign
����(�c0onClipEvent (load){
	_parent.showMenu(true);
}
_minusSign��
CPicButton
�#���
�kbon(release, releaseOutside){
	bCurrShowMenu = _minusSign._visible;
	showMenu(!bCurrShowMenu);
}
M�7����?��]n�1function showMenu( p_bShowMenu){
	trace ("Show Menu called...");

	_root.logMessage("...Show Menu Called",
					 _root._logMgr._eInitialization,
					 _root._logMgr._eMenuControls);

	_minusSign._visible = p_bShowMenu;
	_plusSign._visible = !p_bShowMenu;
	_parent._menu._visible = p_bShowMenu;
}

showMenu()����O��������UN� w  M	-�M�} � ����������� � ��N�.N ���?��8
Layer 1����O������
CPicSprite	
	����-	E_nob��
CPicButton
���Y�
%;�on (press){
	_nob._x = this._xmouse;
	_nob.startDrag(true, -30,  0, 30,0);
	this.bDragging = true;

}
on(release, releaseOutside)
{
	_nob.stopDrag();
	this.bDragging = false;
}����(�P�`	���?��}v
zoom()����O������
CPicButton
�,���
2g�on(release){
	_root.logMessage ( "\nDelete Item pressed" );
	
	EnvManager = _parent._parent._envMgr;
	l_currEnv = EnvManager.getCurrentEnv();
	l_currEnv.setAction( l_currEnv._sysMgr.DELETE_ITEM );
}������(Ӑ��|{|�L���|��|���L�{||�LL���?���
Layer 1����O����������<<�<����<�<<���?��p
Layer 1����O����������������������������������������������������������������������������������������������������������������������������������������������������������������������
CPicSprite����
/���������'�B��
������*�&��
CPicButton��
�,�����
]�on(press){

}
on(release){
	_root.logMessage("\nZoom In ...button pressed", _root._logMgr._eMenuControls);
	
	EnvManager = _parent._parent._envMgr;
	l_currEnv = EnvManager.getCurrentEnv();
	l_currEnv.zoomInSystem();
}���?���f
Layer 1����O������	CPicShape����qZ���4Zh<���?��M
Layer 1����O���������������(����ב޳�������ك�٤&�&�&x�[�56��\&&�&&[�'�F����+��������'ع�q���P
����?���9
Layer 1����O������
CPicSprite����
/���������'�T��
������(-��
CPicButton��
�,�����
�M�on(press){

}
on(release){	
	_root.logMessage("\nZoom Out ...button pressed", _root._logMgr._eMenuControls);

	EnvManager = _parent._parent._envMgr;
	l_currEnv = EnvManager.getCurrentEnv();
	l_currEnv.zoomOutSystem();
}���?��G
Layer 1����O������CPicText	=�����&���qT�Arial Black����"(Debug��
CPicSprite
M�6I��
CPicButton
ӛ:��
M�on(press){
	_root.logMessage("\nDebug System ...button pressed", _root._logMgr._eMenuControls);

	EnvManager = _parent._parent._envMgr;
	l_currEnv = EnvManager.getCurrentEnv();
	l_currEnv.dumpSystem();
} ���?��D
Layer 1����O����z�����(�p�0�0�d0�p�0p�r�c���?���
Layer 1����O�����		�����<��7��0��0q�0����0��o�0��0�0���?��9
Layer 1����O������
CPicSprite
�4�����#�~	_stopIcon
�����$>7onClipEvent (load)
{
	_parent.setPausedIcon(true);
}_goIcon��
CPicButton
�,���
$��on(press){
	_root.logMessage("\nPlay (Stop) ...button pressed", _root._logMgr._eMenuControls);

	setPausedIcon( !bPaused );
	
	EnvManager = _parent._parent._envMgr;
	l_currEnv = EnvManager.getCurrentEnv();

	if (bPaused){
		_root.logMessage("..stopping the system",  _root._logMgr._eMenuControls);
		l_currEnv.stopSystem();
	}else{
		_root.logMessage("..setting system in motion",  _root._logMgr._eMenuControls);
		l_currEnv.playSystem();
	}	
	
}
on(release, releaseOutside){

}���?��<�function setPausedIcon( p_bIsPaused )
{
	this.bPaused = p_bIsPaused;

	this._stopIcon._visible = !bPaused;
	this._goIcon._visible   = bPaused;	
}
setPaused()����O������
CPicButton
�,���
�.��on(press){

}
on(release){
	_root.logMessage("\nRestore System ...button pressed", _root._logMgr._eMenuControls);


	//	_parent._playStopButton.setPausedIcon(true);
	EnvManager = _parent._parent._envMgr;
	l_currEnv = EnvManager.getCurrentEnv();
	l_currEnv.restoreSystem();
	_root.logMessage("...TODO Menu should query System Controller to see if paused", _root._logMgr._eMenuControls);
		
}����������(�
x!-��M�	 �� �	V��!��߳�@غ440f�T0.?�224�=`�&��4�Z6�4@n@74[�74��y@�������К�����?���
Layer 1����O������
CPicSprite
M�6�Z��CPicText	�^���:���D�Arial Black����"(Settings��
CPicButton
ӛ:��
�k�on(release){
	_parent._playStopButton.setPausedIcon(true);
	EnvManager = _parent._parent._envMgr;
	l_currEnv = EnvManager.getCurrentEnv();
	l_currEnv.displaySettings();
}���?���m
Layer 1����O������
CPicButton
{���n\���XU���
Ri�ron(press){
	_root.logMessage("\nNext System ...button pressed", _root._logMgr._eMenuControls);

	//_parent._playStopButton.setPausedIcon(true);
	EnvManager = _parent._parent._envMgr;
	l_currEnv = EnvManager.getCurrentEnv();
	l_currEnv.generateNewSystem();
	_root.logMessage("...TODO Menu should query System Controller to see if paused", _root._logMgr._eMenuControls);
}��3�����(�������`�!CT�0X0/���.����^20�m�0l�u�`�!CT�5���?���r
Layer 1����O������
CPicSprite�|
�|M�5�L�	�
�	�����	
�������� !"#����%&'()*+,-.����0123456789����;<=>?@ABCD����FGHIJKLMNO����QRSTUVWXYZ����\]^_`����bcdefghijk����mnopq����stuvwxyz{|����~�d_nextButton�|
�|���� �I�
H�������!;_refreshButton��
	@2?������"uXonClipEvent (load)
{
//	this.useHandCursor = false;
	//	_global.useHandCursor = false;
}_playStopButton�%|
�%|����%1��
c�������&���
d��������)~5��
������,�
RonClipEvent (load){
	bDragging = false;
}
/*
onClipEvent ( mouseMove ){

}*/�|
�|����8sm���?���g
Layer 1����O������
CPicSprite
M�6���CPicText	�^���:���D�Arial Black����"(Cancel��
CPicButton
��:��
PU'on(release){
	_parent.hideSettings();
}���?���k
Layer 1����O������
CPicSprite
M�6�E��CPicText	�^���:���D�Arial Black����"(OK��
CPicButton
�����
<jqon(release){
	trace("Trying to set num of objects to..."+_parent._inNumObjects);	
	_parent.applySettings(true);
}���?���
Layer 1����O������
CPicSprite
n����<����
CPicButton
Y�
OVon (release){
   _parent.setType(	_parent._parent._settingsData._eTypeCustom, this);
}��CPicText	�c����:=TextField39Impact����"(Custom���?���q
Layer 1����O������
CPicSprite
n����<�rk��
CPicButton����
Y�����
�2Von (release){
   _parent.setType(	_parent._parent._settingsData._eTypeSingle, this);
}��CPicText	�������=TextField39Impact����"(Single���?��ra
Layer 1����O������
CPicSprite
n����<��^��
CPicButton
Y�
�HVon (release){
   _parent.setType(	_parent._parent._settingsData._eTypeSpiral, this);
}��CPicText	�������=TextField39Impact����"(Spiral���?��&
Layer 1����O������
CPicSprite
n����<�a:��
CPicButton
Y�
�"Uon (release){
   _parent.setType(	_parent._parent._settingsData._eTypeRings, this);
}��CPicText	�������=TextField39Impact����"(Rings���?���(
Layer 1����O������
CPicSprite
n����<�a<��
CPicButton
Y�
�/Ton (release){
   _parent.setType( _parent._parent._settingsData._eTypeGrid, this);
}��CPicText	�������=TextField39Impact����"(Grid���?��I,
Layer 1����O���������&���#�!�/��3/�q0MLB3q#3/{/0NH{�#3��3�0��#��͎�̡Є����?���y
Layer 1����O������
CPicSprite
n����<�f��
CPicButton
Y�
�uVon (release){
   _parent.setType(	_parent._parent._settingsData._eTypeBinary, this);
}��CPicText	�������=TextField39Impact����"(Binary X���?���6
Layer 1����O����d���&���#�!�/��3/�q0MLB3q#3/{/0NH{�#3��3�0��#��͎�̡Є����?��~
Layer 1����O������
CPicSprite
d��j���?��/
base����O�����?��-Btfunction setLocation (p_x, p_y){
	//this._alpha = 0;
	this._x = p_x;
	this._y = p_y;
	//this.gotoAndPlay (0);
}
setLocation()�����OO�����	CPicShape������������su�(�0��0�0 �������������������������������������������������������������������������������������������������������������������������������������������������������������������������������?���<
Layer 1����O���������
��⋶�0(�Զu4�u��60�=<L>6uJu0�,J�4�>��0�<���������?���`
Layer 1����O������	CPicShape�B���r�����0��0��0H���?���
Layer 1����O������	CPicSha����
CPicSprite����
������M�SW��CPicText	���6�����Arial Black����"(Type:x�������
x������������_typeHighlight��������
��������d��T
_btnBinaryo����
o����d�WF_btnGrid����
����d�il	_btnRingsg����
g����d��}
_btnSpiralw�������
w�������d�
_btnSingle�����
�����d�@
_btnCustom���?���H
	baseLayer����O��		��������Arial Black����"(Number of Objects:		���������_inNumObjectsArial Black����"(10_inNumObjects�	�
�	�����D�
�����S		2���|����8Arial��"(SettingsMenu_label
�����v�v�lsf�4�L����4���f���4<����f�0��4����4
�Mf�t4
m�t4MMt�0-���?��JI
buttonLayer�����OO����?�����function setType( p_nType ){
	
	l_xTypeButton = null;
	switch (p_nType){
		case m_xSettings._eTypeSingle:
										l_xTypeButton = _btnSingle;
										break;
		case m_xSettings._eTypeBinary:
										l_xTypeButton = _btnBinary;
										break;
		case m_xSettings._eTypeSpiral:
										l_xTypeButton = _btnSpiral;
										break;
		case m_xSettings._eTypeRings:
										l_xTypeButton = _btnRings;
										break;
		case m_xSettings._eTypeGrid:
										l_xTypeButton = _btnGrid;
										break;
		case m_xSettings._eTypeCustom:
										l_xTypeButton = _btnCustom;
										break;
	}
	_typeHighlight.setLocation	( l_xTypeButton._x,  l_xTypeButton._y);
	this._nInModelType = p_nType;
}
setType����O������?��jJ�function displaySettings(p_xSettingsData){
	trace ("...Displaying settings:"+p_xSettingsData.settingsInfo());
	this.m_xSettings = p_xSettingsData;
	
	this._inNumObjects = p_xSettingsData.getObjectCount();
	this.setType ( p_xSettingsData.getType() );
	
	this._visible = true;
}
displaySettings�����3�����?��&s��function applySettings(p_bCloseAfterwards){
	
	l_env    = this._parent;
//	l_system = l_env._sysMgr._system;

	trace ( "ToDO: change the way settings are set from UI into SystemSettings");
	trace ( " ... Path:   Scene1>SystemEnvironment>SystemSettingsMenu>SystemMenuOK");
	l_env._settingsData.setObjectCount( this._inNumObjects );
	l_env._settingsData.setType( this._nInModelType );

	l_env.generateNewSystem();
	
	if(p_bCloseAfterwards)
		hideSettings();
}
applySettings������O����?���}2function hideSettings(){
	this._visible = false;
}
hideSettings�����O�������?�����function generateNewSystem()
{
	_root.logMessage("...Generating System as Requested", _root._logMgr._eMenuControls);
	_root.logMessage(".......should create a History Event", _root._logMgr._eMenuControls);
	
	this.m_bIsPaused 	= true;
	_parent._sysViewer.clearDisplay (); 
	
	_parent._settingsMgr.generateNewModelData (_parent._sysModel);
	_parent._sysViewer.initializeDisplay (_parent._sysModel); 
//	_parent._sysViewer._x = 

	_root.logMessage(".......create a local backup", _root._logMgr._eMenuControls);
	_parent._sysModel.createBackup();
	
}

function restoreSystem()
{
	_root.logMessage("...Restoring System as Requested", _root._logMgr._eMenuControls);
	this.m_bIsPaused 	= true;
	_parent._sysModel.restore();	
	_parent._sysViewer.initializeDisplay (_parent._sysModel); 
	//_parent._sysViewer.updateLocations (_parent._sysModel);
}
function stopSystem()
{
	_root.logMessage("...Stopping System as Requested", _root._logMgr._eMenuControls);
	setState( SYSTEM_STATE_PAUSED );
	//m_bIsPaused = true;
}
function playSystem()
{
	_root.logMessage("...Setting System in Motion as Requested", _root._logMgr._eMenuControls);
	setState( SYSTEM_STATE_MOVING );
	//m_bIsPaused = false;
}


function dumpSystem()
{
	_root.logMessage("...Dumping System as Requested", _root._logMgr._eMenuControls);
	trace (_parent._sysModel.systemInfo() );
}

function zoomInSystem()
{
	_root.logMessage("...Zooming in on System as Requested", _root._logMgr._eMenuControls);
	setState( SYSTEM_STATE_ZOOMING );
	
	_root.logMessage("...Current Viewer Info" + _parent._sysViewer.viewerInfo(), _root._logMgr._eMenuControls);
	_parent._sysViewer.zoomIn();
}

function zoomOutSystem()
{	
	_root.logMessage("...Zooming out of System as Requested", _root._logMgr._eMenuControls);
	setState( SYSTEM_STATE_ZOOMING );
	
	_root.logMessage("...Current Viewer Info" + _parent._sysViewer.viewerInfo(), _root._logMgr._eMenuControls);
	_parent._sysViewer.zoomOut();
}

menuAPI�����OO����?���h�function executeAction( p_object ){
	
	if (DELETE_ITEM = currAction){
		_root.logMessage ("\nExecuting Delete for Object: " + p_object._name);
		_system.removeObjectByName (p_object._name);
	}else{
		_root.logMessage ("\nNo Action Set.");
	}
}
executeAction������O����?���<�function logMessage(p_level, p_message)
{
	trace("************* OLD LOG MESSAGE CALLED ****** in SysController " );
	trace(p_message);
}


utilFunctions()����O�O����?����#function setState(  p_nNewState )
{
	
	_root.logMessage("Changing State to: " + p_nNewState, _root._logMgr._eCoreFunctions);
	switch ( p_nNewState )
	{
		case SYSTEM_STATE_PAUSED:
			this.onEnterFrame = null;
			break;
		case SYSTEM_STATE_MOVING:
			this.onEnterFrame = moving;
			break;
		case SYSTEM_STATE_ZOOMING:		
			this.onEnterFrame = zooming;		
			break;
		default:
			_root.logMessage("...Error changing system. Invalid State specified.", _root._logMgr._eCoreFunctions);
			return;
	}
	
	// Check to see if the system is already zooming,
	//  in which case do not overwrite the saved state
	bZoomWhileZooming = (SYSTEM_STATE_ZOOMING == p_nNewState) && (SYSTEM_STATE_ZOOMING == m_nCurrState);
	if ( !bZoomWhileZooming)
	{
		m_nPrevState 				= m_nCurrState;
		m_nCurrState				= p_nNewState;	
	}
}
setState����O�����?��@�pfunction moving() 
{	//System in motion
	l_startTime = new Date();
	
	
	//  Model the next time step
	_parent._sysModel.stepMotion();
	
	//  Update the display
	_parent._sysViewer.updateLocations(_parent._sysModel);
	
	l_currTime = new Date();
	elapsedTimeInMillis = l_currTime.getTime()-l_startTime.getTime();
	_parent._fpsDisplay.text = "ms:"+elapsedTimeInMillis;
}

moving����O�O�
State Behavior������O����?���]��function zooming ()
{
	// If Viewer is zooming, trigger step of Zoom
	_root.logMessage("...Zooming system in controller", _root._logMgr._eZooming);	
	_parent._sysViewer.stepZoom();
	
	bDoneZooming  = _parent._sysViewer.isDoneZooming();
	
	// Restore previous (Moving vs. Paused) when done
	if (bDoneZooming)
	{
		_root.logMessage("...Done zooming system in controller", _root._logMgr._eZooming);
		setState (m_nPrevState);
	}
}
zooming�����OO���CPicText	((�8Arial��"(SystemController���?���3
baseLayer_DO_NOT_DELETE����O��pe�%Y��qw����s����P00�0��0�	���?���Y
Layer 1����O������	CPicShape���������������s�6��0�����A�0����\r0 ��!|0���0��0iP�.P!d��4
H* pj������?���>
Layer 1����O������3������w��^0<��0���0B02����~��F>���W�� w0���0��K\����?���
Layer 1����O����3��s����0�0P�<�����?���_
Layer 1����O������
CPicButton
CVU�
2`�on (press)
{
	trace("\nObject Pressed: " + this + ", name: " + this._name + ", this level: " + this.getDepth() );
	//	_parent._parent.executeAction (this);
	this.startDrag();
}

on (release)
{
this.stopDrag();	
}�����F�kAF��>)�F��k��������������A��F�>)F��������3����G����GG3ZddddZ3GGG����Z����d����d����G����3����������������������������������������������������������������d����d����Z����G���?���~
Layer 1����O������CPicText	'((E8������������������������������������������������������������������������������������������������������������������������������������������������������������?�����function hideObjects(){
	_root.logMessage("......Hiding Objects For System Viewer:" + this,
								 _root._logMgr._eInitialization);

	this.Explosion01._visible 		= false;
	this.Explosion02._visible 		= false;
	this._label.text 				= "";
	this._label.selectable 			= false;	
	this.ObjTemplate._visible 		= false;
	this._centMassMarker._visible 	= false;
	this._eraser._visible 			= false;
	this._baseCurtain._visible 		= false;
}
hideObjects();
hideObjects������O����?��k6��function viewerInfo()
{
	l_retString		= "\nViewer Info....";
	
	l_retString 	+= "\n  Misc data";	
	l_retString 	+= "\n    m_nStageFPS = " + m_nStageFPS;
	l_retString 	+= "\n    m_xSysEnv   = " + m_xSysEnv;
	l_retString 	+= "\n    m_xSysMgr   = " + m_xSysMgr;
	l_retString 	+= "\n    m_xSettings = " + m_xSettings;


	l_retString 	+= "\n  Level Offsets";	
	l_retString 	+= "\n    m_nDepthOffsetCollisions = " + m_nDepthOffsetCollisions;
	l_retString 	+= "\n    m_nDepthOffsetObjects    = " + m_nDepthOffsetObjects;	

	l_retString 	+= "\n  Zoom Parameters";
	l_retString 	+= "\n    m_nZoomDefault 		= " + m_nZoomDefault;
	l_retString 	+= "\n    m_nZoomSecondsPer     = " + m_nZoomSecondsPer;
	l_retString 	+= "\n    m_nZoomNumSteps   	= " + m_nZoomNumSteps;
	l_retString 	+= "\n    m_nZoomCurFactor   	= " + m_nZoomCurFactor;
	l_retString 	+= "\n    m_nZoomNewFactor 	    = " + m_nZoomNewFactor;
	l_retString 	+= "\n    m_nTempStepScale  	= " + m_nTempStepScale;
	l_retString 	+= "\n    m_nEndScale   		= " + m_nEndScale;
	l_retString 	+= "\n    m_nZoomStepCounter	= " + m_nZoomStepCounter;

	l_retString 	+= "\n  Display area conversions";
	l_retString 	+= "\n    m_AU                 = " + m_AU;
	l_retString 	+= "\n    m_nDisplayConvFactor = " + m_nDisplayConvFactor;
	l_retString 	+= "\n    m_nDisplayOffsetX    = " + m_nDisplayOffsetX;
	l_retString 	+= "\n    m_nDisplayOffsetY    = " + m_nDisplayOffsetY;
	l_retString 	+= "\n    m_nDisplayWidth 	   = " + m_nDisplayWidth;
	l_retString 	+= "\n    m_nDisplayHeight 	   = " + m_nDisplayHeight;

	l_retString 	+= "\n  Currently displaying";
	l_retString 	+= "\n    m_nCurrObjectsDisplayed = " + m_nCurrObjectsDisplayed;
	l_retString 	+= "\n    m_nCurrColsDisplayed 	  = " + m_nCurrColsDisplayed;


	return l_retString;

}

viewerInfo������O���
CPicSprite��
"������	0BObjTemplate��
"������;,Explosion01��
"������"TExplosion02�
�
�!�
�����"_baseCurtainL	
�L	�����@_eraser��CPicText	((8Arial��"(System Viewer_label���?���f
baseLayer_withObjects����O�����?���y��function stepZoom(){
	//CHECK TO SEE IF SYSTEM IS DONE ZOOMING
	l_nScaleDiff 	 = Math.abs(this._xscale - m_nEndScale);
	l_nScaleStepSize = Math.abs(m_nTempStepScale);
	l_bWithinOneStep =  (l_nScaleDiff < 1.1*l_nScaleStepSize);
/*
	// Zoom Parameters
	m_nZoomDefault 			= 20.0;
	m_nZoomSecondsPer		= 0.5; 
	m_nZoomNumSteps 		= m_nStageFPS * m_nZoomSecondsPer;
	m_nZoomCurFactor 		= m_nZoomDefault;
	m_nZoomNewFactor		= m_nZoomCurFactor;
	m_nTempStepScale		= 0;
	m_nEndScale				= 100;
	m_nZoomStepCounter		= 0;
*/
	

	_root.logMessage("...Stepping zoom", _root._logMgr._eZooming);
	
	
	//_root.logMessage ("Curr Scale: " +this._xscale+", EndScale: " + nEndScale
	//				 + ", Diif: " + nScaleDiff + ", StepScaleSize: " + nScaleStepSize);
	//_root.logMessage ("..Within one Step? : " + bWithInOneStep);
	if( l_bWithinOneStep ){
		this._xscale = m_nEndScale;
		this._yscale = this._xscale;
		
		trace ("TODO in stepZoom called scaleZoomedObjects");
		this.scaleZoomedObjects();

		m_bSystemIsZooming = false;
		m_nZoomStepCounter = 0;

		Explosion01._xscale = 100 / (this._xscale/100) ;
		Explosion01._yscale = Explosion01._xscale;

		//p_system.Explosion01._visible = false;
		//p_system.Explosion02._visible = false;
		
		m_nZoomCurFactor = m_nZoomNewFactor;
	}else{	
		this._xscale += m_nTempStepScale;
		this._yscale = this._xscale;
		this.scaleZoomedObjects();
	}	

	// CATCH TO INSURE THE ZOOM STOPS EVENTUALLY
	l_bPassedMaxStepCount = (m_nZoomStepCounter >= (m_nZoomNumSteps+2));
	if(m_bSystemIsZooming && l_bPassedMaxStepCount )
	{
		_root.logMessage ("Forcing zoom to Stop, Num Steps: "+m_nZoomStepCounter, _root._logMgr._eZooming);
		m_bSystemIsZooming = false;
		m_nZoomStepCounter = 0;
	}

	m_nZoomStepCounter++;
}
stepZoom����O�O�
ZoomFunctions����O������?����function zoomIn(){
	_root.logMessage ("\nSystem Viewer zooming in on system, this = " + this);
	this.m_nZoomNewFactor = this.m_nZoomCurFactor * 1.10;
	zoomSystem();
}

function zoomOut(){
	_root.logMessage ("\nSystem Viewer zooming out system, this = " + this);
	this.m_nZoomNewFactor = this.m_nZoomCurFactor * 0.90;
	zoomSystem();
}

function zoomSystem (){
	_root.logMessage ("System Viewer zooming system....");
	this.m_nEndScale		= (this.m_nZoomNewFactor / this.m_nZoomCurFactor) * this.m_nEndScale;
	this.m_nTempStepScale 	= (this.m_nEndScale - this._xscale) / this.m_nZoomNumSteps;

	this.m_nZoomStepCounter = 0;	
	this.m_bSystemIsZooming	= true;
}



zoomIn/Out�����3�����?���s>function isDoneZooming()
{
	return !this.m_bSystemIsZooming;
}
isDoneZooming��������?���X��function removeObjectAt (p_index){
	_root.logMessage ("Viewer removing Object at Index: " + p_index,
				  			_root._logMgr._eCollisionEvent);
	if ( p_index < 0 || p_index > m_nCurrObjectsDisplayed){
		_root.logMessage("..Specified index outside of range",
				  			_root._logMgr._eCollisionEvent);
		return;
	}
	_root.logMessage ("...Name of System Data:  " +m_systemData,
				  			_root._logMgr._eCollisionEvent);
	
	l_sObjToRemove = m_systemData.Name[p_index];
	_root.logMessage ("...Name of Object To Remove:  " +l_sObjToRemove,
				  			_root._logMgr._eCollisionEvent);
	this[l_sObjToRemove].removeMovieClip();
	
	
	l_sLastObject = m_systemData.Name[m_nCurrObjectsDisplayed-1];
	_root.logMessage ("...Name of Object To Rename:  " +l_sLastObject,
				  			_root._logMgr._eCollisionEvent);
	this[ l_sLastObject ]._name = l_sObjToRemove;
	
	
	m_nCurrObjectsDisplayed--;
	
	//_parent._sysViewer.scaleObjectAt ( p_objB );
}

function removeObjectByName (p_name){
	_root.logMessage ("Removing Object Named: " + p_name);
	nIdexOfObject = -1;
	for(i=0; i< numOfObjs; i++){
		//trace("..Comparing object name to Name: " + Name[i] );
		if ( Name[i] == p_name ){
			nIdexOfObject = i;
			break;
		}
	}
	removeObjectAt (nIdexOfObject);
}
removeObject�����3�����?���&��function stepFadeOut()
{
	nDecAlphaStep = 100.0 / m_xSettings.nNumColFadeOutSteps;
	nDecSizeStep = 18.0 / m_xSettings.nNumColFadeOutSteps;
	
	//FADE OUT ANY COLLISIONS
	nNumVisibleCols = colFadeOutQueue.length ;
	
	if ( 0 < nNumVisibleCols )
	{
		//_root.logMessage("Fading out cols, numVisible: " + nNumVisibleCols
		//				+ ", alphaStep: " + nDecAlphaStep);
	}

	for ( i=0; i < nNumVisibleCols; i++ )
	{
		xColision = colFadeOutQueue[i];
		nAlphaOfCol = xColision._alpha;
		
		//_root.logMessage ("....Fading out Colision: " + xColision._name 
		//						+ ", curr Alpha: " + nAlphaOfCol);	

		if ( 0 >= nAlphaOfCol )
		{				
			//_root.logMessage ("......Alpha is less than or eq. to zero, removing colision");	
			xColToRemove = colFadeOutQueue.shift();
			if( xColToRemove != xColision)
			{
				//ERROR
				trace ("********** ERROR ******* Removing Colision out of Order ");
				trace ("....Name Col to Remove: " + xColToRemove._name);
				trace ("....Name Col Expected:  " + xColision._name);
			}else
			{
				xColToRemove.removeMovieClip();
				i--;
				nNumVisibleCols--;
			}
		}else
		{

			xColision._alpha -= nDecAlphaStep;
			xColision._width /= 1.5;
			xColision._height /= 1.5;
			//xColision._width -=	nDecSizeStep;
			//xColision._height -=	nDecSizeStep;
			//_root.logMessage ("......Decreased alpha to: " + xColision._alpha);	
		}

	}// end FOR over fade out queue
}
stepFadeOut��������?���6�function centerMass(){
	xCenterMass = 0;
	yCenterMass = 0;
	nTotalSystemMass = 0;

	//It is likely there will significant rounding error
	// due to dispropotionate values for position and mass
	// One approach could be to calculatie all Mass x PostionX/Y
	// Sort smallest to largest and then sum them before deviding
	for (i=0; i<numOfObjs; i++){
		xCenterMass += 	Px[i] * Mass[i];
		yCenterMass += 	Py[i] * Mass[i];	
		nTotalSystemMass += Mass[i];
	}

	xCenterMass = xCenterMass / nTotalSystemMass;
	yCenterMass = xCenterMass / nTotalSystemMass;

	this.xOffset = -xCenterMass; 
	this.yOffset = -yCenterMass; 

	convertedX = _parent.convertX(xCenterMass);
	convertedY = _parent.convertY(yCenterMass);
	_centMassMarker._x = convertedX;
	_centMassMarker._y = convertedY;
}

centerMass������O����?��	�function setObjectScale(p_obj, p_mass){
	//_root.logMessage( "Setting Scale of Movie: " + p_obj._name + " with mass: " + p_mass);
	objScale = 100;	
	
	if(p_mass>300*Math.pow(10,27)){
		objScale = 200;
	} else if(p_mass>300*Math.pow(10,24)){
		objScale = 100;
	} else if (p_mass>100*Math.pow(10,24)){
		objScale = 50;
	} else{
		objScale = 25;
	}
	objScale = objScale / (p_obj._parent._xscale/100);
	//_root.logMessage (".Setting Obj Scale To: " + objScale);
	p_obj._xScale = objScale;
	p_obj._yScale = p_obj._xScale;
}
setObjectScale�����OO�
DisplayFunctions����O�����?���{��function scaleZoomedObjects()
{
	
	_root.logMessage ( "......scaling objects", _root._logMgr._eZooming);
	
	for(j=0; j<m_nCurrObjectsDisplayed; j++){
		sObjectName = m_systemData.Name[j];
		
		objToScale = this[ sObjectName ];
		objToScale._xscale = 100 / (this._xscale/100) ;
		objToScale._yscale = objToScale._xscale;
		setObjectScale ( objToScale, m_systemData.Mass[j] );
	}
/*	
	p_system._centMassMarker._xscale = 100 / (p_system._xscale/100) ;
	p_system._centMassMarker._yscale = p_system._centMassMarker._xscale;

	p_system._baseCurtain._xscale = 100 / (p_system._xscale/100) ;
	p_system._baseCurtain._yscale = p_system._baseCurtain._xscale;
	


	for (i=0; i<p_system.numOfObjs; i++){
		objToScale = p_system[ p_system.Name[i] ];
		setScale ( objToScale, p_system.Mass[i] );
	}
	

	for ( i=0; i<m_nCurrObjectsDisplayed; i++)
	{
		sObjectName = p_systemData.Name[i];
		nNewX		= p_systemData.Px[i];
		nNewY		= p_systemData.Py[i];

		nNewXInPixels 	= convertX (nNewX) - this._x;
		nNewYInPixels 	= convertY (nNewY) - this._y;		

		//trace ("["+i+"] moving object to (" + nNewXInPixels + ", " + nNewYInPixels+")");

		this[sObjectName]._x = nNewXInPixels;
		this[sObjectName]._y = nNewYInPixels;
	}
	*/
}

scaleZoomedObjects����O�O�"���?��rW�dfunction convertX( p_actualX ){
	xDistanceFromCenter = p_actualX + m_nDisplayOffsetX;
	convertedX = xDistanceFromCenter * m_nDisplayConvFactor;
	return Math.round(convertedX);
}

function convertY( p_actualY ){
	yDistanceFromCenter = p_actualY + m_nDisplayOffsetY;
	convertedY = yDistanceFromCenter * m_nDisplayConvFactor;
	return Math.round(convertedY);
}

convertX/Y�����OO�"���?�����function clearDisplay()
{
	_root.logMessage ( "......clearing the previous objects "+m_nCurrObjectsDisplayed,_root._logMgr._eInitialization,
																	_root._logMgr._eSystemGeneration);

	// Clear the Display
	for ( i=0; i<m_nCurrObjectsDisplayed; i++)
	{	
		sObjectName = m_systemData.Name[i];
		_root.logMessage ( "........clearing object["+i+"]"+sObjectName,_root._logMgr._eInitialization,
														_root._logMgr._eSystemGeneration);

		this[sObjectName].removeMovieClip();
		//_eraser.swapDepths(m_nDepthOffsetObjects + i);
	}
/*
	for ( i=0; i<m_nCurrColsDisplayed; i++)
	{
		_eraser.swapDepths(m_nDepthOffsetCollisions + i);
	}*/

	m_nCurrObjectsDisplayed = 0;
	m_nCurrColsDisplayed 	= 0;
}
clearDisplay�����OO�"���?��Ip��function createObjects( p_systemData  )
{
	_root.logMessage ( "......creating new objects", _root._logMgr._eInitialization,
																	_root._logMgr._eSystemGeneration);

	for ( i=0; i<m_nCurrObjectsDisplayed; i++)
	{
		//(m_nDepthOffsetObjects + i);
		sObjectName = p_systemData.Name[i];
		this.ObjTemplate.duplicateMovieClip(sObjectName, m_nDepthOffsetObjects+i);
		
		setObjectColor( this[sObjectName], p_systemData.Red[i],
												 p_systemData.Green[i],
												 p_systemData.Blue[i]);
		setObjectScale( this[sObjectName], p_systemData.Mass[i]);
	}
/*
	for ( i=0; i<m_nCurrColsDisplayed; i++)
	{
		this.Explosion01.duplicateMovieClip(p_systemData.ColName[i], m_nDepthOffsetCollisions+i);
	}*/
}
createObjects����O�O�"���?��,i�Ifunction updateLocations( p_systemData  )
{
	_root.logMessage ( "......moving objects", _root._logMgr._eInitialization,
											   _root._logMgr._eSystemGeneration);

	for ( i=0; i<m_nCurrObjectsDisplayed; i++)
	{
		sObjectName = p_systemData.Name[i];
		nNewX		= p_systemData.Px[i];
		nNewY		= p_systemData.Py[i];

		nNewXInPixels 	= convertX (nNewX) - this._x;
		nNewYInPixels 	= convertY (nNewY) - this._y;		

		//trace ("["+i+"] moving object to (" + nNewXInPixels + ", " + nNewYInPixels+")");

		this[sObjectName]._x = nNewXInPixels;
		this[sObjectName]._y = nNewYInPixels;
	}
}
updateLocations�����3��"���?��J�Xfunction initializeDisplay ( p_sysData )
{
	_root.logMessage ( "...Initializing the display of system: " + p_sysData, _root._logMgr._eInitialization,
																	_root._logMgr._eSystemGeneration);

	_root.logMessage ( viewerInfo() ,_root._logMgr._eInitialization, _root._logMgr._eSystemGeneration);
	clearDisplay();
	
	m_systemData 			= p_sysData;
	m_nCurrObjectsDisplayed = p_sysData.m_nCurrObjCount;
	m_nCurrColsDisplayed 	= p_sysData.m_collisionCount;
 	
	createObjects( p_sysData );	
	updateLocations (p_sysData);
	
	trace ( "Template is visible : " +  this.Object000._visible);
	return;
}


initializeDisplay����O��""�����?���:]_root.logMessage("...Loading System Model", _root._logMgr._eLoadOrder);
//initializeData(0);
"constructor (has to be last layer)����O�O���CPicText	((�8_labelArial��"(SystemModel���?��}y
	baseLayer����O�����?��I_�!function getNumberedName( p_sBaseName, p_nNumber )
{
	if (p_nNumber<10){
		sNumberedName = p_sBaseName + "00" + p_nNumber;
	}else if (p_nNumber<100) {
		sNumberedName = p_sBaseName + "0" + p_nNumber;
	}else {
		sNumberedName = p_sBaseName + p_nNumber;
	}
	return sNumberedName;
}
getNumberedName�����3�����?����function getOriginalCount()
{
	return this.m_nInitObjCount;
}

function getCurrentCount()
{
	return this.m_nCurrObjCount;
}
 
	accessors�����OO����?���L��function handleCollision(p_nIndexA,p_nIndexB){
	_root.logMessage("...Collision Number: "+m_collisionCount, _root._logMgr._eCollisionEvent);
	_root.logMessage("...NumObjs: " + m_nCurrObjCount, _root._logMgr._eCollisionEvent);
	_root.logMessage("...Ball "+p_nIndexB+" was 'swallowed' by ball "+p_nIndexA, _root._logMgr._eCollisionEvent);

	l_lastIndex = m_nCurrObjCount-1;

	//CALCULATE THE MASS OF THE COMBINED OBJECT
	l_newMass = Mass[p_nIndexA] + Mass[p_nIndexB];

	//PRESERVE THE MOMENTUM OF THE OBJECTS
	Vx[p_nIndexA] = (Mass[p_nIndexA]*Vx[p_nIndexA] 
							+ Mass[p_nIndexB]*Vx[p_nIndexB])/l_newMass;
	Vy[p_nIndexA] = (Mass[p_nIndexA]*Vy[p_nIndexA] 
							+ Mass[p_nIndexB]*Vy[p_nIndexB])/l_newMass;

	//ALSO HAVE TO SET THE FORCE BECAUSE COLLISIONS OCCUR IN THE MIDDLE OF CALCULATING THE FORCE
	// DON'T NEED TO SET ACCELERATION, BECAUSE THAT IS CALCULATED
	//  AFTER ALL COLLISIONS COULD OCCUR IN THE CURRENT STEP
	Fx[p_nIndexA] = Fx[p_nIndexA] + Fx[p_nIndexB];
	Fy[p_nIndexA] = Fy[p_nIndexA] + Fy[p_nIndexB];

	//SET NEW LOCATION TO THE MID POINT	
	//root.logMessage ("  ObjA x: " + Px[p_nIndexA] + ", y: " + Py[p_nIndexA], _root._logMgr._eCollisionEvent);
	//_root.logMessage ("  ObjB x: " + Px[p_nIndexB] + ", y: " + Py[p_nIndexB], _root._logMgr._eCollisionEvent);
	//_root.logMessage ("  Mid  x: " + midX + ", y: " + midy, _root._logMgr._eCollisionEvent);
	l_midX = (Px[p_nIndexA] + Px[p_nIndexB])/2;
	l_midY = (Py[p_nIndexA] + Py[p_nIndexB])/2;
	Px[p_nIndexA] = l_midX;
	Py[p_nIndexA] = l_midY;
		

	//SET THE MASS OF THE COMBINED OBJECT
	Mass[p_nIndexA] = l_newMass;	
	_root.logMessage("...New mass is: "+l_newMass,_root._logMgr._eCollisionEvent);

	//if ( bFreeToMove[p_nIndexB] )
	//	bFreeToMove[p_nIndexA] = false;


	//REMOVE THE OTHER OBJECT	
	_root.logMessage("... Calling Remove ObjectAt: " + l_lastIndex,_root._logMgr._eCollisionEvent);
	_parent._sysViewer.removeObjectAt( p_nIndexB );
	
	if(p_nIndexB < l_lastIndex){
		//HAVE TO COPY INFO FROM LAST SLOT INTO THE SLOT THAT WILL OPEN BY
		// REMOVING THE SECOND OBJECT
		_root.logMessage("...Name of obj to remove: "+Name[p_nIndexB], _root._logMgr._eCollisionEvent);
		copyObjectFromTo(l_lastIndex,p_nIndexB);
	}else{
		_root.logMessage("...Object collided with last object", _root._logMgr._eCollisionEvent);
	} 

	m_nCurrObjCount -= 1;
		
	_parent._sysViewer.scaleObjectAt ( p_nIndexB );
	nCurrColIndex = m_collisionCount;
	
	l_bShowCollisions = true; // m_xSettings.bShowCollisions 
	if (l_bShowCollisions)
	{
		//nDepth = m_nDepthOffsetCollisions + collisionCount * 2; 
		//Explosion01.duplicateMovieClip(this.colName[collisionCount],
		//			nDepth);	
		_root.logMessage( "...colision name: " + this.colName[nCurrColIndex],   _root._logMgr._eCollisionEvent);
	
		this.colLocX[nCurrColIndex] = Px[p_nIndexA];
		this.colLocY[nCurrColIndex] = Py[p_nIndexA]; 
		this.colSize[nCurrColIndex] = 100; 

		//this[colName[nCurrColIndex]]._x = _parent.convertX(this,Px[p_nIndexA]);
		//this[colName[nCurrColIndex]]._y = _parent.convertY(this,Py[p_nIndexA]);
		m_collisionCount++;		
	}
}



function copyObjectFromTo(fromIndex,toIndex){

	Mass[toIndex]=Mass[fromIndex];

	Px[toIndex] = Px[fromIndex];
	Py[toIndex] = Py[fromIndex];

	Vx[toIndex] = Vx[fromIndex];
	Vy[toIndex] = Vy[fromIndex];

	Fx[toIndex] = Fx[fromIndex];
	Fy[toIndex] = Fy[fromIndex];

	Ax[toIndex] = Ax[fromIndex];
	Ay[toIndex] = Ay[fromIndex];

	//bFreeToMove[toIndex] = bFreeToMove[fromIndex];

	this[Name[fromIndex]]._name = Name[toIndex];

	// DO NOT NEED TO COPY SCALE OR COLOR BECAUSE THESE ARE
	//  MAINTAINED BY THE MOVIECLIP ITSELF
}
handleCollision����O�����?��O1��
function createBackup()
{
	_root.logMessage(".....backing up system", _root._logMgr._eMenuControls);
	this.numOfObjsBKUP = this.m_nInitObjCount;
	
	_numObjsToBackup  = this.m_nInitObjCount;
	this.NameBKUP = new Array(_numObjsToBackup);
	this.MassBKUP = new Array(_numObjsToBackup);

	this.PxBKUP = new Array(_numObjsToBackup);
	this.PyBKUP = new Array(_numObjsToBackup);

	this.VxBKUP = new Array(_numObjsToBackup);
	this.VyBKUP = new Array(_numObjsToBackup);

	this.RedBKUP	= new Array(_numObjsToBackup);
	this.GreenBKUP	= new Array(_numObjsToBackup);
	this.BlueBKUP	= new Array(_numObjsToBackup);

 	for(a=0; a<this.m_nInitObjCount; a++){ 
		this.NameBKUP[a]=this.Name[a];
		this.MassBKUP[a]=this.Mass[a];

		this.PxBKUP[a] = this.Px[a];
		this.PyBKUP[a] = this.Py[a];

		this.VxBKUP[a] = this.Vx[a];
		this.VyBKUP[a] = this.Vy[a];

		this.RedBKUP[a]		= this.Red[a];
		this.GreenBKUP[a]	= this.Green[a];
		this.BlueBKUP[a]	= this.Blue[a];
	}

}

function restore(){
	//trace(".......Restoring System");
	//trace ( "...System Info: " + systemInfo( this) );

	_root.logMessage("...Restoring System (In SystemModel)", _root._logMgr._eMenuControls);
	this.m_nInitObjCount = this.numOfObjsBKUP;
	this.m_nCurrObjCount = m_nInitObjCount;

	//trace ("..Number of Objects to Restore: " + this.numOfObjs);
	for(a=0; a<this.m_nInitObjCount; a++){
		
		this.Name[a]=this.NameBKUP[a];	
		this.Mass[a]=this.MassBKUP[a];	

		this.Px[a] = this.PxBKUP[a];
		this.Py[a] = this.PyBKUP[a];	

		this.Vx[a] = this.VxBKUP[a];	
		this.Vy[a] = this.VyBKUP[a];	

		this.Red[a]		= this.RedBKUP[a];
		this.Green[a]	= this.GreenBKUP[a];
		this.Blue[a]	= this.BlueBKUP[a];
	}

	this.m_nInitObjCount = 0;
	this.colLocX = new Array(numOfObjs);
	this.colLocY = new Array(numOfObjs);
	this.colName = new Array(numOfObjs);


	for(j=0; j<this.m_nInitObjCount; j++){
		this.colName[j] = getNumberedName ( this.m_sBaseCollisionName, j);
	}

}



function copyFromTo( p_nFromIndex, p_nToIndex){
	trace (" DEBUG ... Design Flaw. This function assumes that the arrays need to be ");
	trace ("           compacted at the time of collision.  Should just use a boolean,");
    trace ("           bIsActive to effectively remove an object from the system.  ");
	
	Mass[p_nToIndex]= Mass[p_nFromIndex];

	Px[p_nToIndex] = Px[p_nFromIndex];
	Py[p_nToIndex] = Py[p_nFromIndex];

	Vx[p_nToIndex] = Vx[p_nFromIndex];
	Vy[p_nToIndex] = Vy[p_nFromIndex];

	Fx[p_nToIndex] = Fx[p_nFromIndex];
	Fy[p_nToIndex] = Fy[p_nFromIndex];

	Ax[p_nToIndex] = Ax[p_nFromIndex];
	Ay[p_nToIndex] = Ay[p_nFromIndex];

	//bFreeToMove[toIndex] = bFreeToMove[fromIndex];

	this[Name[p_nFromIndex]]._name = Name[p_nToIndex];

	// DO NOT NEED TO COPY SCALE OR COLOR BECAUSE THESE ARE
	//  MAINTAINED BY THE MOVIECLIP ITSELF
}
backup/restore������O����?��^��function systemInfo()
{	
	l_retString = "\nSystem info...";	
	
	l_retString += "\nConstants...";
	l_retString += "\n..AU= " + this.AU;
	l_retString += "\n..G= "  + this.G;
	l_retString += "\n..Timescale= " + this.timeScale;


	l_retString += "\nObject Count...";
	l_retString += "\n..Curr Obj Count= " + this.m_nCurrObjCount;
	l_retString += "\n..Orig Obj Count= " + this.m_nInitObjCount;

	l_retString += "\nCollision Objects...";
	l_retString += "\n..count= " + this.m_collisionCount;
	for(j=0; j<this.m_collisionCount; j++)
	{
		l_retString += "\n..Name: " +this.colName[j];
		l_retString += "\t..Pos(" + this.colLocX[j];
		l_retString += ", " + this.colLocY[j];		
	}

	l_retString += "\nMass Objects...";
	l_retString += "\n..count= " + this.m_nCurrObjCount;
	for(k=0; k<this.m_nCurrObjCount; k++)
	{
		l_retString += "\n..Name: " + this.Name[k];
		l_retString += "\tMass: " + this.Mass[k];
		l_retString += "\tP(" + this.Px[k] + ", " + this.Py[k] + ")";
		l_retString += "\tV(" + this.Vx[k] + ", " + this.Vy[k] + ")";
		l_retString += "\tA(" + this.Ax[k] + ", " + this.Ay[k] + ")";
		l_retString += "\tF(" + this.Fx[k] + ", " + this.Fy[k] + ")";
		l_retString += "\tObjFree:" + this.bFreeToMove[k];
		//	this.Red[k] 	this.Green[k]	this.Blue[k]
	}
	
	l_retString += "\nBackup of Mass Objects...";
	l_retString += "\n...count= " + this.numOfObjsBKUP;
	for(k=0; k<this.m_nCurrObjCount; k++)
	{
		l_retString += "\n..Name: " + this.NameBKUP[k];
		l_retString += "\tMass: " + this.MassBKUP[k];
		l_retString += "\tP(" + this.PxBKUP[k] + ", " + this.PyBKUP[k] + ")";
		l_retString += "\tV(" + this.VxBKUP[k] + ", " + this.VxBKUP[k] + ")";
			
		l_retString += "\tObjFree:" + "NOT BACKED UP!!"; //this.bFreeToMove[k];
		//	this.Red[k] 	this.Green[k]	this.Blue[k]
	}
	return l_retString;
}




systemInfo�����O�����?���M��function stepMotion(){
	//l_startTime = new Date();
	//trace("System NOT paused");
	//trace(new Date());
	
	//trace(new Date());
	//ASSERT NOT PAUSED SO CONTINUE MOVING OBJECTS
	
	xCenterMass = 0;
	yCenterMass = 0;
	//nTotalSystemMass = 0;

	//FIND NEW POSITIONS
	for (i=0; i<m_nCurrObjCount; i++){
		if ( bFreeToMove[i] )
		{
			//_root.logMessage("..Calculating Pos for unpinned obj#: " + i);
			Px[i] += Vx[i]/timescale;
			Py[i] += Vy[i]/timescale;
		}

		//xCenterMass += 	Px[i] * Mass[i];
		//yCenterMass += 	Py[i] * Mass[i];	
		//nTotalSystemMass += Mass[i];
	}

	//xCenterMass = xCenterMass / nTotalSystemMass;
	//yCenterMass = xCenterMass / nTotalSystemMass;


	//SET THE OFFSET BASED ON THE SELECTED OBJECT
	xOffset =0;// -xCenterMass; // -Px[selectedObj];
	yOffset =0;// -yCenterMass; //-Py[selectedObj];

	/*convertedX = _parent.convertX(this,xCenterMass);
	convertedY = _parent.convertY(this,yCenterMass);
	_centMassMarker._x = convertedX;
	_centMassMarker._y = convertedY;*/

	//ZERO OUT THE FORCE VECTOR FOR EACH OBJECT
	/*for (j=0; j<numOfObjs; j++){	
		Fx[j] = 0;
		Fy[j] = 0;
	}*/

	//CALCULATE FORCES ON OBJECTS
	for (i=0; i<m_nCurrObjCount; i++){	
		for(k=i+1; k<m_nCurrObjCount; k++){
			 
			deltaX = Px[k] - Px[i];
			deltaY = Py[k] - Py[i];
			 
			distSquared = deltaX*deltaX + deltaY*deltaY;			
			distance = Math.sqrt( distSquared );

			//CHECK FOR COLLISIONS		
			if(distance < nCollisionThreshold){				
				//BALLS COLLIDED AND COALESCE INTO ONE BALL	
				//_root.logMessage("Distance="+distance);
				trace ("\nCollision occurred...");
				handleCollision(i,k);

				if ( 1 == 1)
				{
					//xNewColToFadeOut = this[colName[collisionCount-1]];
					_root.logMessage("New Collision To Fade Out="+xNewColToFadeOut._name,
							 _root._logMgr._eCollisionEvent);
					//colFadeOutQueue.push( xNewColToFadeOut  );
				}			
	

				// DECREMENT THE INNER FOR LOOP INDEX
				// BECAUSE OBJECT K WAS REMOVED AND THE
				// LAST OBJECT WAS PUT IN ITS PLACE
				// ...NEED TO CALC GRAVITY BTW. i AND k AGAIN
				// SINCE numOfObjs IS ONE DECREMENTED AS WELL
				// ..IF k WAS THE LAST OBJECT, THE k WILL BE
				// EQUAL TO numOfObjs AND THUS THE FOR LOOP
				// WILL BE COMPLETED
				k--;
				//paused = true;
				continue;			

			}		

			// CALCULATE GRAVITATIONAL FORCE BETWEEN TWO OBJECTS					
			//     F = G x ( Mass1 x Mass2 ) /  ( distance ^ 2 )
			//Fmag = G * Mass[i] * Mass[k] / (distance*distance);
			GravFactor = G / distSquared;
		
			Accel_i = GravFactor * Mass[k];
			Accel_k = GravFactor * Mass[i];

			sinTheta = deltaY / distance;
			cosTheta = deltaX / distance;

			Vx[i] += Accel_i * cosTheta / timescale;
			Vy[i] += Accel_i * sinTheta / timescale;

			Vx[k] -= Accel_k * cosTheta / timescale;
			Vy[k] -= Accel_k * sinTheta / timescale;
			
		}
	}
/*
	
	currTime = new Date();
	elapsedTimeInMillis = currTime.getTime() - l_startTime.getTime();
	fps = Math.round (1 / ( elapsedTimeInMillis / 1000 ) );
	//_parent._parent._fpsDisplay = "" + fps + " fps"
	_parent._parent._fpsDisplay = "ms:" + elapsedTimeInMillis ;*/

}

stepMotion��������?��DI�tfunction stepMotion2(){
// ORIGINAL 


	l_startTime = new Date();
	//trace("System NOT paused");
	//trace(new Date());
	
	//trace(new Date());
	//ASSERT NOT PAUSED SO CONTINUE MOVING OBJECTS

	//FIND NEW POSITIONS
	for (i=0; i<numOfObjs; i++){
		if ( bFreeToMove[i] ){
			//_root.logMessage("..Calculating Pos for unpinned obj#: " + i);
			Px[i] += Vx[i]/timescale;
			Py[i] += Vy[i]/timescale;
		}

		//xCenterMass += 	Px[i] * Mass[i];
		//yCenterMass += 	Py[i] * Mass[i];	
		//nTotalSystemMass += Mass[i];
	}

//	xCenterMass = xCenterMass / nTotalSystemMass;
	//yCenterMass = xCenterMass / nTotalSystemMass;


	//SET THE OFFSET BASED ON THE SELECTED OBJECT
//	xOffset = -xCenterMass; // -Px[selectedObj];
//	yOffset = -yCenterMass; //-Py[selectedObj];

	centerMass();

	//MOVE THE OBJECTS
	for (i=0; i<numOfObjs; i++){
		if ( bFreeToMove[i] ){
			//_root.logMessage("..Calculating Conv Pos for unpinned obj#: " + i);
			convertedX = _parent.convertX(this,Px[i]);
			convertedY = _parent.convertY(this,Py[i]);
	
			this[Name[i]]._x = convertedX;
			this[Name[i]]._y = convertedY;
		}
		//trace("New position= "+newX +","+newY);

		//_root.logMessage ("..Moving Ball["+i+"] to: ("+newX+", " + newY+")");
		//trace("Actual position= "+Px[i] +","+Py[i]);
		//trace("Conv'd position= "+_parent[Name[i]]._x +","+_parent[Name[i]]._y);
		//currBall._x = currBall._x + currBall.V[0]/timeScale;
		//currBall._y = currBall._y + currBall.V[1]/timeScale;
	}

	//ZERO OUT THE FORCE VECTOR FOR EACH OBJECT
	for (j=0; j<numOfObjs; j++){	
		Fx[j] = 0;
		Fy[j] = 0;
	}

	//CALCULATE FORCES ON OBJECTS
	for (i=0; i<numOfObjs; i++){	
		for(k=i+1; k<numOfObjs; k++){
			 
			deltaX = Px[k] - Px[i];
			deltaY = Py[k] - Py[i];

			distance = Math.abs( Math.sqrt(deltaX*deltaX 
							+ deltaY*deltaY) );
			//CHECK FOR COLLISIONS		
			if(Math.abs(distance) < nCollisionThreshold){
				
				//BALLS COLLIDED AND COALESCE INTO ONE BALL	
				//_root.logMessage("Distance="+distance);
				collision(i,k);
				_parent.coverLatestCollision(this);

				// DECREMENT THE INNER FOR LOOP INDEX
				// BECAUSE OBJECT K WAS REMOVED AND THE
				// LAST OBJECT WAS PUT IN ITS PLACE
				// ...NEED TO CALC GRAVITY BTW. i AND k AGAIN
				// SINCE numOfObjs IS ONE DECREMENTED AS WELL
				// ..IF k WAS THE LAST OBJECT, THE k WILL BE
				// EQUAL TO numOfObjs AND THUS THE FOR LOOP
				// WILL BE COMPLETED
				k--;
				//paused = true;
				continue;			

			}		

			// CALCULATE GRAVITATIONAL FORCE BETWEEN TWO OBJECTS					
			//     F = G x ( Mass1 x Mass2 ) /  ( distance ^ 2 )
			Fmag = G * Mass[i] * Mass[k] / (distance*distance);

			//...THEN MULTIPLE Fmag by THE SINE and COSINE
			xForce = Fmag * deltaX/distance;
			yForce = Fmag * deltaY/distance;
			
			Fx[i] += xForce;
			Fy[i] += yForce;
			
			Fx[k] -= xForce;
			Fy[k] -= yForce;	
		}
	}

	//CALCULATE ACCELERATIONS OF OBJECTS
	for (i=0; i<numOfObjs; i++){
		if ( bFreeToMove[i] ){
			//_root.logMessage("..Calculating Aceel for unpinned obj#: " + i);
			Ax[i] = Fx[i] / Mass[i];
			Ay[i] = Fy[i] / Mass[i];
		}
		//trace("Obj["+i+"], accel="+Ax[i]+","+Ax[i]);
	}	

	//CHANGE VELOCITIES
	for (i=0; i<numOfObjs; i++){
		if ( bFreeToMove[i] ) {
			//_root.logMessage("..Calculating Velo for unpinned obj#: " + i);
			Vx[i] += Ax[i]/timescale;
			Vy[i] += Ay[i]/timescale;
		}
	}


	currTime = new Date();
	elapsedTimeInMillis = currTime.getTime() - l_startTime.getTime();
	//fps = Math.round (1 / ( elapsedTimeInMillis / 1000 ) );
	//_parent._parent._fpsDisplay = "" + fps + " fps"
	_parent._parent._fpsDisplay = "" + elapsedTimeInMillis;

}
old_stepMotion����O������?��@.��function initializeData( p_nObjectCount ){
	_root.logMessage("\nInitializing System Model", _root._logMgr._eInitialization, _root._logMgr._eSystemGeneration);
	_root.logMessage("....Named:" + this, _root._logMgr._eInitialization, _root._logMgr._eSystemGeneration);
	_root.logMessage("....Object Count:" + p_nObjectCount, _root._logMgr._eSystemGeneration);


	// Model Parameters	
	this.AU					 = 1.5 * Math.pow(10,11);	// Astronomical Unit = 1.5e11 in meters
	this.G 					 = 6.67* Math.pow(10,-11);	// Gravitational Constant
	this.timeScale 			 = 0.00000015;				// This is really 1/T, where T is secs per step
	this.nCollisionThreshold = 5 * Math.pow(10,10);		// This is to handle FEA issues of poor step size														//   

	//SETS THE NUMBER OF OBJECTS IN THE SYSTEM
	this.m_nInitObjCount = p_nObjectCount;
	this.m_nCurrObjCount = m_nInitObjCount;

	// CREATE THE ARRAYS THAT WILL BE USED
	// TO TRACK THE COLLISIONS
	this.m_sBaseCollisionName =  "Collision";
	this.m_collisionCount = 0;
	this.colLocX = new Array(m_nInitObjCount);
	this.colLocY = new Array(m_nInitObjCount);
	this.colName = new Array(m_nInitObjCount);
	this.colSize = new Array(m_nInitObjCount);

	// INITIALIZE THE ARRAYS THAT WILL BE USED
	// TO TRACK THE COLLISIONS
	for(j=0; j<m_nInitObjCount; j++){		
		this.colName[j] = getNumberedName ( this.m_sBaseCollisionName, j);
		this.colLocX[j] = 0;
		this.colLocY[j] = 0;
		this.colSize[j] = 0;
	}
	
	//INITIALIZE THE INFO ARRAYS THAT WILL BE USED TO
	// TRACK PARAMETERS DESCRIBING SELECTED OBJECT
	this.m_sBaseObjectName =  "Object";

	this.Name = new Array(this.m_nInitObjCount);
	this.Mass = new Array(this.m_nInitObjCount);

	this.Px = new Array(this.m_nInitObjCount);
	this.Py = new Array(this.m_nInitObjCount);

	this.Vx = new Array(this.m_nInitObjCount);
	this.Vy = new Array(this.m_nInitObjCount);

	this.Fx = new Array(this.m_nInitObjCount);
	this.Fy = new Array(this.m_nInitObjCount);

	this.Ax = new Array(this.m_nInitObjCount);
	this.Ay = new Array(this.m_nInitObjCount);

	this.Red = new Array(this.m_nInitObjCount);
	this.Green = new Array(this.m_nInitObjCount);
	this.Blue = new Array(this.m_nInitObjCount);

	this.bFreeToMove = new Array(this.m_nInitObjCount);

	//Clear out the arrays describing the objects
	// TODO : Switch logic of bFreeToMove to bIsPinnedDown 
	//        so that default 0 allows for motion
	for(a=0; a<m_nInitObjCount; a++){
		this.Name[a]	= getNumberedName ( this.m_sBaseObjectName, a);
		this.Mass[a]	= 0.0;

		this.Px[a]    	= 0.0;
		this.Py[a]		= 0.0;

		this.Vx[a]		= 0.0;
		this.Vy[a]		= 0.0;

		this.Fx[a]		= 0.0;
		this.Fy[a]		= 0.0;

		this.Ax[a]		= 0.0;
		this.Ay[a]		= 0.0;	

		this.bFreeToMove[a] = true;
	}
	_root.logMessage("...ModelData Cleared out:" + systemInfo() , _root._logMgr._eInitialization);

 
	//_root.logMessage ( "..Checking for extra objects..." );
	//_root.logMessage ( "....PrevObjCount: " + this.prevTotalObjects);
	//_root.logMessage ( "....totalobjects: " + this.totalObjects);
}

initializeData�����OO�����CPicText	((R
8Arial��"(SettingsController���?��6k
Layer 1O�����?��e�function displaySettings()
{	
	trace ("Answering Display Settings Request...");
	_parent._settingsMenu.displaySettings (_parent._settingsData);
}
menuApi����O������?���\��function generateNewModelData(p_sysModel){
	_root.logMessage ("\nGenerating New Model Data", _root._logMgr._eSystemGeneration);
		
	xCfg 			= _parent._settingsData;
	l_nType 		= xCfg.m_nType;
	l_nObjectCount 	= xCfg.m_nObjectCount;

	_root.logMessage ("...Current Settings: " + xCfg.settingsInfo(),  _root._logMgr._eSystemGeneration);
	p_sysModel.initializeData (l_nObjectCount);

	if (xCfg._eTypeSingle == l_nType){
		generateSingleSystem(p_sysModel);

	}else if (xCfg._eTypeBinary == l_nType){
		generateBinarySystem(p_sysModel);

	}else if (xCfg._eTypeSpiral == l_nType){
		generateSpiralSystem(p_sysModel);

	}else if (xCfg._eTypeRings == l_nType){
		setupRings(p_sysModel);

	}else if (xCfg._eTypeGrid == l_nType){
		setupGrid(p_sysModel);

	}else{
		_root.logMessage ("No match found for type: " + l_nType, _root._logMgr._eSystemGeneration);
	}

	
	_root.logMessage ("...New Model Data: " + p_sysModel.systemInfo(),  _root._logMgr._eSystemGeneration);
}
generateNewModelDataO�O����?��>�function generateSingleSystem(p_systemModel){
	/*
	  @ THIS CREATES A SYSTEM WITH A LARGE OBJECT -SUN-  
		 IN THE CENTER AND WITH PLANETS RANGING FROM 1E-6 
		 TO 1E-3 THE MASS OF LARGE OBJECT.
	  @ IT ALSO RANDOMLY PLACES THE OTHER OBJECTS BUT CALCULATES
	     THE INDIVIDUAL VELOCITIES NECESSARY FOR THE OBJECTS TO 
	     ORBIT THE SUN
	*/		

	xCfg 			= _parent._settingsData;
	l_nObjectCount 	= xCfg.m_nObjectCount;

	_root.logMessage("\nRunning basic Setup",  _root._logMgr._eSystemGeneration);
	_root.logMessage("...Num Objs in System: " + l_nObjectCount,  _root._logMgr._eSystemGeneration);

	if ( 1 > l_nObjectCount )
	{
		_root.logMessage(".....Invalid number of objects, halting generation",  _root._logMgr._eSystemGeneration);
	}else if (l_nObjectCount != p_systemModel.m_nCurrObjCount) 
	{
		_root.logMessage(".....Inconsistent number of objects, halting generation",  _root._logMgr._eSystemGeneration);
	}

	//SET THE MASS OF THE SUN
	p_systemModel.Mass[0] = 1.989*Math.pow(10,30);
		
	//p_systemModel[p_systemModel.Name[0]]._xScale = 200;
	//p_systemModel[p_systemModel.Name[0]]._yScale = p_systemModel[p_systemModel.Name[0]]._xScale;
	p_systemModel.Red[0] 	= 230;
	p_systemModel.Green[0]	= 230;
	p_systemModel.Blue[0] 	= 0;
	
	//RANDOMLY SET THE MASSES OF THE REMAINING OBJECTS
	for(i=1; i<l_nObjectCount; i++){
		power =  23+ random(3);
		nBase = 1+random(400);
		
		p_systemModel.Mass[i] =  nBase * Math.pow(10,power);
		//	_root.logMessage("Running Spiral Setup");("number="+number+", mass="+p_systemModel.Mass[i]);  //GOOD
	}

	//SET THE WHETHER OR NOT AN OBJECT IS ALLOWED TO MOVE
	for(i=0; i<l_nObjectCount; i++){	
		if( i%2 == 1 ){
			//_root.logMessage ("..Pinning Object Down, object#: " + i);
			//p_systemModel.bFreeToMove[i]=false;
		}
	}

	//SET THE COLORS OF THE OBJECTS
	for(i=1; i<l_nObjectCount; i++){
		nameOfcurrObject = p_systemModel.Name[i];
		redVal = 180; //random(255);
		greenVal = 180; //random(255);
		blueVal = 0; //random(255);

		p_systemModel.Red[i] = redVal;
		p_systemModel.Green[i] = greenVal;
		p_systemModel.Blue[i] = blueVal;
		//	_root.logMessage("Running Spiral Setup");("Saving color["+i+"]:"+p_systemModel.Red[i]
		//		+", "+p_systemModel.Green[i]+", "+p_systemModel.Blue[i])
	}
	
	//SET THE POSITION OF THE SUN TO THE CENTER OF THE VIEW
	p_systemModel.Px[0] = 0.0;
	p_systemModel.Py[0] = 0.0;
	
	//RANDOMLY SET THE POSITION OF THE REMAINING OBJECTS
	for(j=1; j<l_nObjectCount; j++){
		radius =  1 +random(10) + Math.random();
		rotation = random(360);
		
		//radius = 2+j*.85;
		//rotation = 50+10*j;//j*-18;

		xInAUs = radius * Math.cos(rotation*Math.PI/180);
		yInAUs = radius * Math.sin(rotation*Math.PI/180);
		p_systemModel.Px[j] = xInAUs * p_systemModel.AU;
		p_systemModel.Py[j] = yInAUs * p_systemModel.AU;
	}	

	//cALCULATE AND ASSIGN THE ORBITAL VELOCITIES OF OBJECTS
	for(k=1; k<l_nObjectCount; k++){
		deltaX=  p_systemModel.Px[k] - p_systemModel.Px[0];
		deltaY=  p_systemModel.Py[k] - p_systemModel.Py[0];
		
		if ( deltaX   != p_systemModel.Px[k])
		{
			trace ( " TRACE:   ROUNDING ERROR");
			trace ( "      deltaX = " + deltaX + ", Px["+k+"] = " + p_systemModel.Px[k] );
		}

		distance = Math.abs( Math.sqrt(deltaX*deltaX 
							+ deltaY*deltaY) );

		velocityMag = Math.sqrt(p_systemModel.G * p_systemModel.Mass[0] / distance);
		

		//'VelocityMag' IS MULTI. BY NEG. RECIPROCAL OF SLOPE
		//_root.logMessage("Running Spiral Setup");((k % 2)*2-1);
		p_systemModel.Vx[k]= velocityMag * deltaY / distance ;// *((k % 2)*2-1);
		p_systemModel.Vy[k]= velocityMag * deltaX / distance * -1;// *((k % 2)*2-1);		
	}
}
generateSingleSystem��O����?��I�cfunction generateBinarySystem(p_systemModel){
	/*
	  @ THIS CREATES A SYSTEM WITH TWO LARGE OBJECTS  
	*/		
	_root.logMessage("\nRunning binary Setup",  _root._logMgr._eSysSetup);
	_root.logMessage("....Num Objs in System: " + p_systemModel.numofObjs,  _root._logMgr._eSysSetup);
	//l_sBrainToStr = p-*/+_system._parent.systemInfo( p_systemModel);
	//_root.logMessage("..Brain String: " + l_sBrainToStr );
	

	//SET THE MASS OF THE BINARY STARS
	p_systemModel.Mass[0] = 2*Math.pow(10,30);
	nMassRatio = 1;
	p_systemModel.Mass[1] = p_systemModel.Mass[0] * nMassRatio;
		
	//p_systemModel[p_systemModel.Name[0]]._xScale = 200;
	//p_systemModel[p_systemModel.Name[0]]._yScale = p_systemModel[p_systemModel.Name[0]]._xScale;
	p_systemModel.Red[0] = 190;
	p_systemModel.Green[0] = 50;
	p_systemModel.Blue[0] = 0;

	p_systemModel.Red[1] = 50;
	p_systemModel.Green[1] = 0;
	p_systemModel.Blue[1] = 190;
	_parent.setObjectColor(p_systemModel[p_systemModel.Name[1]],
										p_systemModel.Red[1],
										p_systemModel.Green[1],
										p_systemModel.Blue[1]);

	//RANDOMLY SET THE MASSES OF THE REMAINING OBJECTS
	for(i=2; i<p_systemModel.numOfObjs; i++){
		power =  23+ random(3);
		nBase = 1+random(400);
		
		p_systemModel.Mass[i] =  nBase * Math.pow(10,power);
	}

	//SET THE COLORS OF THE OBJECTS
	for(i=2; i<p_systemModel.numOfObjs; i++){
		nameOfcurrObject = p_systemModel.Name[i];
		redVal = 0; //random(255);
		greenVal = 0; //random(255);
		blueVal = 0; //random(255);

		p_systemModel.Red[i] = redVal;
		p_systemModel.Green[i] = greenVal;
		p_systemModel.Blue[i] = blueVal;
	}
	
	//SET THE POSITION OF THE SUN TO THE CENTER OF THE VIEW
	p_systemModel.Px[0] = 15.0*p_systemModel.AU;
	p_systemModel.Py[0] = 0.0;

	p_systemModel.Px[1] = -15.0*p_systemModel.AU;
	p_systemModel.Py[1] = 0.0;

	// TODO : Handle more general case to calc. initial velociites.
	p_systemModel.Vx[0] = 0;
	p_systemModel.Vy[0] = 1 * Math.sqrt(p_systemModel.G * 0.25 * p_systemModel.Mass[0]/Math.abs(p_systemModel.Px[0]));

	p_systemModel.Vx[1] = 0;
	p_systemModel.Vy[1] = -1 * Math.sqrt(p_systemModel.G * 0.25 * p_systemModel.Mass[0]/Math.abs(p_systemModel.Px[0]));

	binaryDiameter = 30;
	
	p_systemModel.centerMass();
	
	//RANDOMLY SET THE POSITION OF THE REMAINING OBJECTS
	for(j=2; j<p_systemModel.numOfObjs; j++){

		posType = random (4);
		trace ("Position type: " + posType);		
		if(0 == posType){
			//ORBIT MASS[0]
			trace ("..Object ["+j+"] put in orbit around Mass[0]");
			radius = 2 + Math.random()*binaryDiameter/3;
			rotation = random(360);
			xInAUs = 15 + radius * Math.cos(rotation*Math.PI/180);
			yInAUs = 0 + radius * Math.sin(rotation*Math.PI/180);

			p_systemModel.Px[j] = xInAUs * p_systemModel.AU;
			p_systemModel.Py[j] = yInAUs * p_systemModel.AU;


			deltaX= p_systemModel.Px[0] - p_systemModel.Px[j];
			deltaY= p_systemModel.Py[0] - p_systemModel.Py[j];

			distance = Math.abs( Math.sqrt(deltaX*deltaX 
							+ deltaY*deltaY) );
		
			velocityMag = Math.sqrt(p_systemModel.G * p_systemModel.Mass[0] / distance);
		
			p_systemModel.Vx[j]= velocityMag * deltaY / distance * -1;
			p_systemModel.Vy[j]= velocityMag * deltaX / distance ;

		}else if (1 == posType){

			trace ("..Object ["+j+"] put in orbit around Mass[1]");
			//ORBIT MASS[1]
			radius = 2 + Math.random()*binaryDiameter/3;
			rotation = random(360);
			xInAUs = -15 + radius * Math.cos(rotation*Math.PI/180);
			yInAUs = 0 + radius * Math.sin(rotation*Math.PI/180);

			p_systemModel.Px[j] = xInAUs * p_systemModel.AU;
			p_systemModel.Py[j] = yInAUs * p_systemModel.AU;


			deltaX= p_systemModel.Px[1] - p_systemModel.Px[j];
			deltaY= p_systemModel.Py[1] - p_systemModel.Py[j];

			distance = Math.abs( Math.sqrt(deltaX*deltaX 
							+ deltaY*deltaY) );
		
			velocityMag = Math.sqrt(p_systemModel.G * p_systemModel.Mass[1] / distance);
		
			p_systemModel.Vx[j]= velocityMag * deltaY / distance ;
			p_systemModel.Vy[j]= velocityMag * deltaX / distance * -1;

		}else if (2 == posType || 3 == posType){
			trace ("..Object ["+j+"] put in	outer orbit around Center of Mass");
			//ORBIT CENTER MASS
			radius = binaryDiameter + random(binaryDiameter);
			rotation = random(360);
			xInAUs = radius * Math.cos(rotation*Math.PI/180);
			yInAUs = radius * Math.sin(rotation*Math.PI/180);

			p_systemModel.Px[j] = xInAUs * p_systemModel.AU;
			p_systemModel.Py[j] = yInAUs * p_systemModel.AU;


			deltaX= p_systemModel.Px[j];
			deltaY= p_systemModel.Py[j];

			distance = Math.abs( Math.sqrt(deltaX*deltaX 
							+ deltaY*deltaY) );
		
			//SHORT CUT... should add the masses at the very least
			velocityMag = Math.sqrt(p_systemModel.G * (p_systemModel.Mass[0] *2)/ distance);
		
			p_systemModel.Vx[j]= velocityMag * deltaY / distance * -1;
			p_systemModel.Vy[j]= velocityMag * deltaX / distance;

		}		
	}


	// PLACE ALL OF THE OBJECTS ON THE DISPLAY AREA
	for(k=0; k<p_systemModel.numOfObjs; k++){
		currObject = p_systemModel.Name[k];
		//_root.logMessage ("MOving Object: " + p_systemModel[currObject]._name ,  _root._logMgr._eSysSetup);
		//_root.logMessage ("...current position: (" + p_systemModel[currObject]._x +", " + p_systemModel[currObject]._y+")",  _root._logMgr._eSysSetup);
			
		p_systemModel[currObject]._x = p_systemModel._parent.convertX(p_systemModel,p_systemModel.Px[k]);
		p_systemModel[currObject]._y = p_systemModel._parent.convertY(p_systemModel,p_systemModel.Py[k]);
		//_root.logMessage ("...New position: (" + p_systemModel[currObject]._x +", " + p_systemModel[currObject]._y+")",  _root._logMgr._eSysSetup);		
		//_root.logMessage("Converted (" +p_systemModel.Px[k]+","+p_systemModel.Py[k]+") to ("
		//		 +p_systemModel[currObject]._x+","+p_systemModel[currObject]._y+")" ,  _root._logMgr._eSysSetup); 
	}

}
generateBinarySystem�3�����?��2_��function generateSpiralSystem(p_system){

	_root.logMessage("\nRunning Spiral System Setup",  _root._logMgr._eSysSetup);
	_root.logMessage("....Num Objs in System: " + p_system.numofObjs,  _root._logMgr._eSysSetup);
	//l_sBrainToStr = p-*/+_system._parent.systemInfo( p_system);
	//_root.logMessage("..Brain String: " + l_sBrainToStr );
				
	//RANDOMLY SET THE MASSES OF THE REMAINING OBJECTS
	for(i=0; i<p_system.numOfObjs; i++){
		power =  23+ random(3);
		nBase = 1+random(400);
		
		p_system.Mass[i] =  nBase * Math.pow(10,power);
		//	_root.logMessage("Running Spiral Setup");("number="+number+", mass="+p_system.Mass[i]);  //GOOD
	}

	//SET THE WHETHER OR NOT AN OBJECT IS ALLOWED TO MOVE
	for(i=0; i<p_system.numOfObjs; i++){	
		if( i%2 == 1 ){
			//_root.logMessage ("..Pinning Object Down, object#: " + i);
			//p_system.bFreeToMove[i]=false;
		}
	}

	//SET THE COLORS OF THE OBJECTS
	for(i=0; i<p_system.numOfObjs; i++){
		nameOfcurrObject = p_system.Name[i];
		redVal = random(255);
		greenVal = random(255);
		blueVal = random(255);

		p_system.Red[i] = redVal;
		p_system.Green[i] = greenVal;
		p_system.Blue[i] = blueVal;
	}
	
	//SET THE POSITION OF THE SUN TO THE CENTER OF THE VIEW
	p_system.Px[0] = 0.0;
	p_system.Py[0] = 0.0;
	
	//RANDOMLY SET THE POSITION OF THE REMAINING OBJECTS
	for(j=0; j<p_system.numOfObjs; j++){
		radius = (5+j)%( p_system.numOfObjs/ 4);
		rotation = 15*j;
		
		//radius = 2+j*.85;
		//rotation = 50+10*j;//j*-18;

		xInAUs = radius * Math.cos(rotation*Math.PI/180);
		yInAUs = radius * Math.sin(rotation*Math.PI/180);
		p_system.Px[j] = xInAUs * p_system.AU;
		p_system.Py[j] = yInAUs * p_system.AU;
	}	

	//cALCULATE AND ASSIGN THE ORBITAL VELOCITIES OF OBJECTS
	/*for(k=1; k<p_system.numOfObjs; k++){
		deltaX= p_system.Px[0] - p_system.Px[k];
		deltaY= p_system.Py[0] - p_system.Py[k];

		distance = Math.abs( Math.sqrt(deltaX*deltaX 
							+ deltaY*deltaY) );

		velocityMag = Math.sqrt(p_system.G * p_system.Mass[0] / distance);
		

		//'VelocityMag' IS MULTI. BY NEG. RECIPROCAL OF SLOPE
		//_root.logMessage("Running Spiral Setup");((k % 2)*2-1);
		p_system.Vx[k]= velocityMag * deltaY / distance ;// *((k % 2)*2-1);
		p_system.Vy[k]= velocityMag * deltaX / distance * -1;// *((k % 2)*2-1);
	}*/

	p_system.centerMass();

	for(k=0; k<p_system.numOfObjs; k++){
		currObject = p_system.Name[k];
		_root.logMessage ("MOving Object: " + p_system[currObject]._name ,  _root._logMgr._eSysSetup);
		_root.logMessage ("...current position: (" + p_system[currObject]._x +", " + p_system[currObject]._y+")",  _root._logMgr._eSysSetup);
			
		p_system[currObject]._x = p_system._parent.convertX(p_system,p_system.Px[k]);
		p_system[currObject]._y = p_system._parent.convertY(p_system,p_system.Py[k]);
		_root.logMessage ("...New position: (" + p_system[currObject]._x +", " + p_system[currObject]._y+")",  _root._logMgr._eSysSetup);
		
		 _root.logMessage("Converted (" +p_system.Px[k]+","+p_system.Py[k]+") to ("
				 +p_system[currObject]._x+","+p_system[currObject]._y+")" ,  _root._logMgr._eSysSetup); 
	}

}
generateSpiralSystem�OO�Arial��"(SettingsData���?��@K�$function settingsInfo()
{
	l_retString = "\nSettings Data: ";

	l_retString += "\n  Types...";
	l_retString += "\n    _eTypeSingle:  " + _eTypeSingle;
	l_retString += "\n    _eTypeBinary:  " + _eTypeBinary;
	l_retString += "\n    _eTypeSpiral:  " + _eTypeSpiral;
	l_retString += "\n    _eTypeRings:   " + _eTypeRings;
	l_retString += "\n    _eTypeGrid:    " + _eTypeGrid;
	l_retString += "\n    _eTypeCustom:  " + _eTypeCustom;



	l_retString += "\n  ModelSettings...";
	l_retString += "\n    Current Type:    " + m_nType;
	l_retString += "\n    Object Count:    " + m_nObjectCount;
	


	l_retString += "\n  DisplaySettings...";
	l_retString += "\n    Show Collisions  " + bShowCollisions;
	l_retString += "\n    Fade out steps   " + nNumColFadeOutSteps;

	return l_retString;
}
settingsInfo����O�����?��U�function setObjectCount( p_nNewObjectCount)
{
	trace ("Setting object count to: " + p_nNewObjectCount );
	m_nObjectCount = p_nNewObjectCount;
}
function getObjectCount()
{
	return m_nObjectCount;
}
set/get ObjectCount�����OO����?���v�function setType( p_nNewType)
{
	trace ("Setting type to: " + p_nNewType );
	m_nType = p_nNewType;
}
function getType()
{
	return m_nType;
}
set/get Type����O�O�����CPicText	((^8Arial��"(History Viewer_label���?��P#
Layer 1����O������CPicText	((
8TextField42Arial��"(HistoryController���?�� 
Layer 1����O������CPicText	((�8TextField44Arial��"(HistoryModel���?���V
Layer 1����O������	CPicSha����
CPicSprite��������
���������������{onClipEvent ( load )
{	
	_root.logMessage("...Loading History Model", _root._logMgr._eLoadOrder);
	this._visible = false;
}_historyModele������
��e����������2onClipEvent ( load )
{	
	_root.logMessage("...Loading History Controller", _root._logMgr._eLoadOrder);
	this._visible = false;
}_historyMgr��������
�����������������u�onClipEvent ( load )
{	
	_root.logMessage("...Loading History Viewer", _root._logMgr._eLoadOrder);
	_label.text = "";
	_label.selectable = false;
}_historyViewer{���g���
'{���g��������"�wonClipEvent(load){

	_root.logMessage("...Loading Settings Data", _root._logMgr._eLoadOrder);

	_eTypeSingle = 1;
	_eTypeBinary = 2;
	_eTypeSpiral = 3;
	_eTypeRings  = 4;
    _eTypeGrid   = 5;
    _eTypeCustom = 6;

	// Set up the default settings
	m_nObjectCount = 10;

	m_nType = _eTypeSingle;

	bShowCollisions = true;
	nNumColFadeOutSteps = 10;

	this._visible = false;
}_settingsData����<���
����<�������xX�onClipEvent ( load )
{	
	_root.logMessage("...Loading Settings Controller", _root._logMgr._eLoadOrder);
	this._visible = false;
}_settingsMgr��������
���������������;.onClipEvent(load)
{
	this._visible = false;	
}	_sysModel����
��������f�onClipEvent(load){

	_root.logMessage("...Loading System Viewer", _root._logMgr._eLoadOrder);

	// Misc Flash Movie information
	m_nStageFPS		= 12;
	m_xSysEnv 		= _parent;
	m_xSysMgr		= m_xSysEnv._sysMgr;
	m_xSettings 	= m_xSysEnv._settings;

	//USED TO TRANSLATE THE POSITIONS OF OBJECTS TO 
	// COORDINATES IN THE VIEWABLE AREA
	m_nDisplayWidth		= 700;
	m_nDisplayHeight	= 500;

	// Level Offsets
	m_nDepthOffsetCollisions = 100;
	m_nDepthOffsetObjects    = 500;
	

	// Zoom Parameters
	m_nZoomDefault 			= 20.0;
	m_nZoomSecondsPer		= 0.5; 
	m_nZoomNumSteps 		= m_nStageFPS * m_nZoomSecondsPer;
	m_nZoomCurFactor 		= m_nZoomDefault;
	m_nZoomNewFactor		= m_nZoomCurFactor;
	m_nTempStepScale		= 0;
	m_nEndScale				= 100;
	m_nZoomStepCounter		= 0;
	m_bSystemIsZooming 		= false;

	m_AU					= 1.5 * Math.pow(10,11);		//CANDIDATE for _global
	m_nDisplayConvFactor	= 1 / (m_nZoomCurFactor*m_AU) * m_nDisplayHeight/2;
	m_nDisplayOffsetX		= 0;
	m_nDisplayOffsetY		= 0;
	
	m_nCurrObjectsDisplayed = 0;
	m_nCurrColsDisplayed 	= 0;	
}
_sysViewer����H���
������H�������~��onClipEvent (load)
{
	_root.logMessage("...Loading System Controller", _root._logMgr._eLoadOrder,
									_root._logMgr._eInitialization);

	_root.logMessage (".....System Model:        " + _parent._sysModel,_root._logMgr._eInitialization);
	_root.logMessage (".....Settings Data:       " + _parent._settingsData ,_root._logMgr._eInitialization);
	_root.logMessage (".....Settings Controller: " + _parent._settingsMgr ,_root._logMgr._eInitialization);


	_root.logMessage("...Generating Initial System", _root._logMgr._eMenuControls);
	_root.logMessage(".......No History Event needed", _root._logMgr._eMenuControls);

	_parent._settingsMgr.generateNewModelData (_parent._sysModel);
	_parent._sysViewer.initializeDisplay (_parent._sysModel); 
	_parent._sysModel.createBackup(); 

	m_bIsPaused 	= true;	
	m_bIsZooming	= false;
	m_bPrevPaused   = m_bIsPaused;			// Used for restore Pause state after such things as Zooming
		
	SYSTEM_STATE_PAUSED			= 0;
	SYSTEM_STATE_MOVING			= 1;
	SYSTEM_STATE_ZOOMING		= 2;
	m_nCurrState				= SYSTEM_STATE_PAUSED;
	m_nPrevState 				= m_nCurrState;
	
	this._visible = false;
}


/*
onClipEvent (enterFrame)
{
	if ( m_bIsPaused )
	{
		// If Viewer is zooming, trigger step of Zoom		

	}else
	{
	
		l_startTime = new Date();		
		//System in motion
		//  Model the next time step
		_parent._sysModel.stepMotion();

		//  Update the display
		_parent._sysViewer.updateLocations (_parent._sysModel);
		

		currTime = new Date();
		elapsedTimeInMillis = currTime.getTime() - l_startTime.getTime();
		//fps = Math.round (1 / ( elapsedTimeInMillis / 1000 ) );
		//_parent._parent._fpsDisplay = "" + fps + " fps"
		_parent._fpsDisplay = "ms:" + elapsedTimeInMillis ;
	}

}*/_sysMgr��
�������#�onClipEvent ( load )
{	
	_root.logMessage("...Loading Settings Menu", _root._logMgr._eLoadOrder);
	_label.text = "";
	_label.selectable = false;
	this._visible = false;
}_settingsMenu��������
��������d�3tx_label��CPicText	S�����
�hArial����"(_fpsDisplay_fpsDisplay���?��0
	baseLayer����O�����?��+��function generateNewSystem(){
	_root.logMessage("...Generate New System Requested", _root._logMgr._eMenuControls);
	_sysMgr.generateNewSystem();
}

function restoreSystem(){
	_root.logMessage("...Restore System Requested", _root._logMgr._eMenuControls);
	_sysMgr.restoreSystem();
}

function playSystem(){
	_root.logMessage("...Set in Motion Requested", _root._logMgr._eMenuControls);
	_sysMgr.playSystem();
}

function stopSystem(){ 
	_root.logMessage("...Stop System Requested", _root._logMgr._eMenuControls);
	_sysMgr.stopSystem();
}

function dumpSystem(){
	_root.logMessage("...Dump System Requested", _root._logMgr._eMenuControls);
	_sysMgr.dumpSystem();
}

function zoomInSystem(){
	_root.logMessage("...Zoom In System Requested", _root._logMgr._eMenuControls);
	_sysMgr.zoomInSystem();
}

function zoomOutSystem(){
	_root.logMessage("...Zoom out System Requested", _root._logMgr._eMenuControls);
	_sysMgr.zoomOutSystem();
}

function displaySettings(){
	_root.logMessage("...Show Settings Menu Requested", _root._logMgr._eMenuControls);
	_fpsDisplay = "";
	_sysMgr.stopSystem();
	_settingsMgr.displaySettings();	
}

function setAction ( p_action ){
	trace ("Deprecated function called.   setAction() in SystemEnvironment");
}
menuControls��������?���Sfunction updateGoPauseButton()
{	
//	_parent._playStopButton.setPausedIcon(true);
}
controlMenu����O������?����function handleCollision( p_nObjIndexA, p_nObjIndexB)
{

	// Create History Event
	
	// Model the collision

	// Update the viewer
	
	// Communicate the update to the user

}
handleCollision�����3��peF ��dsP�C�TU��CPicText	������@����f@Arial��"(SystemEnvironment���?��*f
Layer 1����O������	CPicShapeF ��dsP�C�TU��CPicText	������@����f@Arial��"(SystemEnvironment���?���$
Layer 1����O����
�����D&�v�<�����4�p"�<:�4pp�0�L<: �4p����<�� ���4����"����?��l=
Layer 1����O��������s�����4����4�Lh�p4l�p4LLp�084lph�4L�����4�h�����	����������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������4����h����?���A
Layer 1����O������	CPicShape\��������W)���</�//r<�A�p+Ѽ/�0E�����4ѫ�ѐ4Ž/�E/��q�+B��q.���?���
Layer 1����O������	CPicShapea�������
����(s�Ot�8�b�����4��p"�8������4�op�0�L<: �4p����8c�� ���4����"����?��xT
Layer 1����O������
CPicSpriteX�#
X�#�����_menu�b%
�b%d�._btnMenuHideShow(D���
(D�������0EN�onClipEvent (load)
{
	trace("...Loading Log Manager");
	this._visible			= false;
	m_bWarnOnFilteredMsg 	= false;


	// ENUMERATE THE LOGGING AREAS
	_eMinArea			= 1;		// USED FOR VALIDATING SPECIFIED LOGGING AREAS
	
	_eMenuControls 		= 1;
	_eLoadOrder	 		= 2;
	_eInitialization	= 3; 
	_eSystemGeneration	= 4;
	_eCollisionEvent	= 5;
	_eCoreFunctions		= 6;
	_eViewer			= 7;
	_eLayout			= 8; 
	_eZooming			= 9;
	
	_eMaxArea			= 9;		// USED FOR VALIDATING SPECIFIED LOGGING AREAS
			
			
	// Logging of particular areas can be disabled by commenting out 
	//   the line that adds the area to the list of enabled areas. 
	enabledFuncAreas = new Array();
	enabledFuncAreas.push(_eMenuControls);	
	//enabledFuncAreas.push(_eLoadOrder);	
	//enabledFuncAreas.push(_eInitialization); 	
	//enabledFuncAreas.push(_eSystemGeneration); 	
	enabledFuncAreas.push(_eCollisionEvent); 		
	enabledFuncAreas.push(_eCoreFunctions); 		
	enabledFuncAreas.push(_eViewer); 		
	enabledFuncAreas.push(_eLayout); 		
	//enabledFuncAreas.push(_eZooming);  
}


_logMgr����
��������1&�onClipEvent (load)
{
	_root.logMessage("...Loading Environment Manager", _root._logMgr._eLoadOrder, _root._logMgr._eInitialization);
	this._visible			= false;

	_envList = new Array();
	_envList.push( "_sysEnv00" );
	_currEnv = _parent._sysEnv00;
}_envMgr_�
_�����
�onClipEvent ( load )
{	
	_root.logMessage("...Loading System Environment", _root._logMgr._eLoadOrder);
	this._label._visible = false;
	
	this._fpsDisplay.text = "";
	this._fpsDisplay.selectable = false;
}	_sysEnv00���?��#H�T_global.setObjectColor = function(movie,R,G,B){
	//set the color of the movie clip
	//trace("Setting color:"+R+", "+G+", "+B + "...MovieName: "+movie._name) ;
	newColor = new Color(movie);
	colorTransform = new Object;

	colorTransform.ra = R/255.0*100;
	colorTransform.ga = G/255.0*100;
	colorTransform.ba = B/255.0*100;

	newColor.setTransform(colorTransform);
}

function layout()
{
	_root.logMessage("\nStage Resized... should layout UI", _root._logMgr._eLayout);
}

Stage.scaleMode = "noScale"; 
Stage.onResize = layout();


hideObjects = function ()
{
	trace( "wrong objects hidden....");
}
UtilityFunctions����O�����?���Z��trace ("\n\n********************* System Started *********************");


_global.logMsg = function(p_message, p_funcArea,  p_AltFuncArea1, p_AltFuncArea2)
{
	_root.logMessage(p_message, p_funcArea, p_AltFuncArea1, p_AltFuncArea2);	
}
	


function logMessage (p_message, p_funcArea,  p_AltFuncArea1, p_AltFuncArea2)
{
	//trace("Mesage from area: " + p_funcArea);
	_logMgr.logMessage (p_message, p_funcArea, p_AltFuncArea1, p_AltFuncArea2);

	//trace ("Area1 : " + p_funcArea + ", AltArea1: " + p_AltFuncArea1+ ", Alt2: " + p_AltFuncArea2);
    //trace ("Message...\n" + p_message);
}

function traceMessage(p_message)
{
	trace("Basic Message...");
	trace (p_message);
}

logMessage�����OO����?���L�'s_nOrigWidth = Stage.width;
s_nOrigHeight = Stage.height;
_layoutMgr = new LayoutMgr(s_nOrigWidth, s_nOrigHeight);

function LayoutMgr(p_nWidth, p_nHeight)
{
	m_nOrigWidth = p_nWidth;
	m_nOrigHeight = p_nHeight;
	
	m_nAdjOriginX = 0;
	m_nAdjOriginY = 0;	
}

LayoutMgr.prototype.onResize = function()
{
	//trace ("LayoutMgr :: Stage Resized to: " + Stage.width + " x " + Stage.height);
	
	nDiffWidth		= Stage.width - m_nOrigWidth;
	nDiffHeight		= Stage.height - m_nOrigHeight;
	//trace (" ...Width diff: " + nDiffWidth);
	//trace (" ...Height diff: " + nDiffHeight);
	
	
	
	m_nAdjOriginX = 0 ;//- nDiffWidth/2;
	m_nAdjOriginY = 0 ;//- nDiffHeight/2;

	//trace (" ......Adj Orig X : " + m_nAdjOriginX);
	//trace (" ......Adj Orig Y : " + m_nAdjOriginY);
	
	
	nMenuWidth = 528; // _menu.width/2;
	nMenuHeight = 38; // _menu.height;
	
	_menu._x = Math.round( m_nAdjOriginX + Stage.width /2 - nMenuWidth/2); 
	_menu._y = Math.round(m_nAdjOriginY + Stage.height - nMenuHeight - 10); 
		
	_btnMenuHideShow._x = Math.round(_menu._x + nMenuHeight /2);
	_btnMenuHideShow._y = Math.round(_menu._y + nMenuHeight /2);
	
	xCurEnv = _envMgr.getCurrentEnv();
	xCurEnv._x = Math.round( m_nAdjOriginX + Stage.width /2); 
	xCurEnv._y = Math.round( m_nAdjOriginY + Stage.height /2); 
	
	xCurEnv._fpsDisplay._x  = Math.round (m_nAdjOriginX + 500);
	//xCurEnv._fpsDisplay._y  = Math.round (m_nAdjOriginY + 20);
	
	
}

Stage.scaleMode = "noScale"; 		// Does not scale the movie 
Stage.align = "TL";				// align = "TL" causes the 0,0 to be in the upper left corner.
Stage.addListener ( _layoutMgr );
layout����O�O�	
��������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������)��CDocumentPagePage 1Scene 1��4B�����J~aB����	Symbol 56
MenuBorder8v?aB	Symbol 56����v?aB����	Symbol 55MenuHideShowBackground7��OB�	Symbol 55������OB����	Symbol 54ButtonBackground6��OB�	Symbol 54����ٳOB����	Symbol 53MenuBackground5,�OB	Symbol 53�����/RB����	Symbol 51SystemEnvironmentLabel3�OB|	Symbol 51�����OB����	Symbol 50SystemEnvironment Label2F�OBz	Symbol 50����F�OB����Symbol 1SystemEnvironments�A/��Af
.\temp.fla"SystemComponents/SystemEnvironment��4B��AfJ~aB����Symbol 2HistoryDatas�A/��B�
.\temp.flaSystemComponents/HistoryData�`B��B��`B����Symbol 3HistoryManagers�A/BE
.\temp.flaSystemComponents/HistoryManager�`BBE�`B����Symbol 4HistoryViewers�A/�B�
.\temp.flaSystemComponents/HistoryVieweraB�B�O�OB����Symbol 5SystemSettingss�A/)��AF
.\temp.flaSystemComponents/SystemSettings&aB)��AF�waB����Symbol 6SettingsController�B�
.\temp.flaSettingsController.�/B�B�9waB����Symbol 7SystemModels�A//�BV
.\temp.flaSystemComponents/SystemModel,z4B/�BV�xaB����Symbol 8SystemViewers�A/@�BX
.\temp.flaSystemComponents/SystemViewerf�4B@�BXraB����Symbol 9Ball	�u�A0��;ObjectTemplate
.\temp.flaTemplates/Ball�}�A��;�5RB����	Symbol 10internalButton
�^�<8��<
.\temp.flaButtons/internalButtonD��A��<��OB����	Symbol 11Explosion01�u�A0���<+
.\temp.flaTemplates/Explosion01_��A���<+_��A����	Symbol 12Explosion02�u�A0��<-
.\temp.flaTemplates/Explosion02��<��<-��<����	Symbol 13StageCurtain&JBS
.\temp.flaStageCurtain&JB&JBS&JB����	Symbol 14Eraser��BJ
.\temp.flaEraser��B��BJ��B����	Symbol 15SystemControllers�A/+�BY
.\temp.fla!SystemComponents/SystemController�PB+�BY0raB����	Symbol 16SystemSettingsMenus�A/��Ah
.\temp.fla#SystemComponents/SystemSettingsMenui�/B��Ah2}aB����	Symbol 17
Background�v�A1�M�<
.\temp.flaUI_Templates/Background�B�M�<�_aB����	Symbol 18Border�v�A1R;�<
.\temp.flaUI_Templates/BorderR;�<R;�<R;�<����	Symbol 19TypeIcon_Highlight���A;���AG
.\temp.flaTypeIcons/TypeIcon_Highlighti�/B���AGi�/B����	Symbol 20TypeIcon_HighlightBaseg��AD
.\temp.flaTypeIcon_HighlightBasei�/Bg��ADi�/B����	Symbol 21TypeIcon_Binary���A;���A;
.\temp.flaTypeIcons/TypeIcon_Binary���A���A;||aB����	Symbol 22TypeIconBackground���A;J��A6
.\temp.flaTypeIcons/TypeIconBackground���AJ��A6���A����	Symbol 23TypeIcon_Grid���A;���A=
.\temp.flaTypeIcons/TypeIcon_Grid���A���A=�faB����	Symbol 24TypeIcon_Rings���A;	��A?
.\temp.flaTypeIcons/TypeIcon_Rings���A	��A?�faB����	Symbol 25TypeIcon_Spiral���A;&��AA
.\temp.flaTypeIcons/TypeIcon_Spiral���A&��AA�faB����	Symbol 26TypeIcon_Single���A;���AC
.\temp.flaTypeIcons/TypeIcon_Single���A���AC�xaB����	Symbol 27TypeIcon_Custom���A;���AE
.\temp.flaTypeIcons/TypeIcon_Custom���A���AEgaB����	Symbol 28SystemMenuOKs�A/Ӻ�A*
.\temp.flaSystemComponents/SystemMenuOK�RBӺ�A*FvaB����	Symbol 29SystemMenuCancels�A/���A,
.\temp.fla!SystemComponents/SystemMenuCancel���A���A,vaB����	Symbol 30Menuw�A2�M�<
.\temp.flaMenuComponents/Menu��/B�M�<taB����	Symbol 31Next�^�<8�6="
.\temp.flaButtons/Next�LB�6="��OB����	Symbol 32settingButton w�A2Je�A!
.\temp.flaMenuComponents/settingButton��/BJe�A!taB����	Symbol 33refreshButton!�^�<8w�<>
.\temp.flaButtons/refreshButton8Bw�<>��OB����	Symbol 34PlayStopButton":��AM
.\temp.flaPlayStopButton�zB:��AM��OB����	Symbol 35StopIcon#�^�<8s��AO
.\temp.flaButtons/StopIcon��As��AO��A����	Symbol 36GoIcon$�^�<8k��AN
.\temp.flaButtons/GoIcon��Ak��AN�OB����	Symbol 37DebugButton%w�A2ѻ�A0
.\temp.flaMenuComponents/DebugButtonP��Aѻ�A0p1RB����	Symbol 38ZoomOutButton&�^�<8��A@
.\temp.flaButtons/ZoomOutButton39B��A@��OB����	Symbol 39MagGlass'��A6��A3
.\temp.flaButtons/bZoomIcons/MagGlass��A��A3��OB����	Symbol 40	MinusSign(��A6�A5
.\temp.flaButtons/bZoomIcons/MinusSign��A�A5��A����	Symbol 41ZoomInButton)�^�<8��A-
.\temp.flaButtons/ZoomInButton���A��A-��OB����	Symbol 42PlusSign*��A6G�A,
.\temp.flaButtons/bZoomIcons/PlusSignG�AG�A,G�A����	Symbol 43DeleteX+�^�<8��A/
.\temp.flaButtons/DeleteXSB��A/��OB����	Symbol 44
ZoomSlider,�^�<8�A�A[
.\temp.flaButtons/ZoomSliderݵ�A�A�A[��OB����	Symbol 45ZoomSliderNob-�^�<8EB�A]
.\temp.flaButtons/ZoomSliderNobvx�AEB�A]vx�A����	Symbol 46HideShowButtonWrapper.^�<6�c�<:
.\temp.fla,Buttons/HideShowButton/HideShowButtonWrapper�ZB�c�<:ǶOB����	Symbol 47MenuHideShow/^�<6�]�<1
.\temp.fla#Buttons/HideShowButton/MenuHideShowv�A�]�<1v�A����	Symbol 48
LogManager0s�A/A��AS
.\temp.flaSystemComponents/LogManagerTBA��AS%�YB����	Symbol 49EnvironmentManager1s�A/&��AQ
.\temp.fla#SystemComponents/EnvironmentManagerV9B&��AQ��OB����9�6'h�hhhhfff�������������	CColorDef�:�:�:3�P�:f�P�0:��P�H:��P�`:��P�x:3��:33�(�:3f�<�0:3��C�H:3��F�`:3��H�x:f��0:f3��0:ff�(�0:f��5�H:f��<�`:f��@�x:�:333�0:�:3���:33�x�:f3�d�0:�3�]�H:�3�Z�`:�3�X�x:33���:333�0:3f3�PPH:3�3�Px`:3�3�P�x:3�3�P�:f3���0:f33�PH:ff3�(PH:f�3�<x`:f�3�C�x:f�3�F�:�:fff�`:�:f���0:3f���0:ff�x�0:�f�k�H:�f�d�`:�f�`�x:3f���0:33f��PH:3ff�xPH:3�f�dx`:3�f�]�x:3�f�Z�:ff���0:f3f��PH:fff�`:f�f�P0x:f�f�Px�:f�f�P�:�:�����:�:����H:3����H:f����H:���x�H:̙�n�`:���h�x:3����H:33���x`:3f���x`:3���xx`:3̙�k�x:3���d�:f����H:f3���x`:ff���0x:f���x0x:f̙�dx�:f���]�:�:�����:�:����`:3����`:f����`:�����`:���x�`:���p�x:3����`:33����x:3f����x:3�����x:3���x�x:3���n�:f����`:f3����x:ff���x�:f����x�:f���xx�:f���k�:�:�����:�:����x:3����x:f����x:�����x:����x:���x�x:3����x:33����:3f����:3�����:3�����:3���x�:f����x:f3����:ff����:f�����:f�����:f���x�:�:���x:�:���H:�3��H:�f��H:���(�H:���2�`:���8�x:���`:�3�
�`:�f��`:̙��`:���(�`:���0�x:���x:�3��x:�f��x:����x:��� �x:���(�x:�:��P�x:�:�3���H:�33�x`:�f3�x`:��3�(x`:��3�5�x:��3�<�:�3���`:�33��x:�f3��x:̙3��x:��3�(�x:��3�2�:�3���x:�33��:�f3�
�:��3��:��3��:��3�(�:�:����x:�:�f���H:�3f��x`:�ff�0x:��f�(0x:��f�<x�:��f�C�:�f���`:�3f��x:�ff�x�:̙f�x�:��f�(x�:��f�5�:�f���x:�3f���:�ff��:��f��:��f��:��f�(�:�:���(�x:�:�����H:�3���x`:�f���0x:�����:�̙�PP�:����P��:̙���`:�3��Րx:�f���x�:̙��P�:�̙�(P�:����<��:�����x:�3����:�f����:������:�̙���:����(��:�:���x�x:�:�����`:�3����x:�f���x�:�����P�:����xP�:����d��:�����`:�3��Ȑx:�f���x�:̙���P�:�����:����P��:�����x:�3����:�f����:�������:������:����(��:�:�����x:�:�����x:�3����:�f����:�������:�������:����x��:�����x:�3����:�f����:̙�����:�������:����x��:�����x:�3����:�f����:�������:�������:�����:�:�������:�������:�����:�����:�����:�f��`����z�����f����������:���*���]������������������SystemComponentss�A/����	Templates�u�A0����Buttons�^�<8����UI_Templates�v�A1����	TypeIcons���A;����MenuComponentsw�A2����
bZoomIcons�^�<8��A6����HideShowButton�^�<8^�<6������h